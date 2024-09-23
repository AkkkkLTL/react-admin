import { ApolloClient, gql, useLazyQuery, useMutation } from "@apollo/client";
import { ChangeEvent, FC, FormEvent, useState } from "react";

import "./styles.scss"
import { set } from "nprogress";

interface IProps {
  client: ApolloClient<any>;
}

interface ISearch {
  orgName:string;
  repoName:string;
}

interface IRepo {
  id: string;
  name: string;
  description: string;
  viewerHasStarred: boolean;
  stargazers: {
    totalCount:number;
  };
  issues: {
    edges: [
      {
        node: {
          id:string;
          title:string;
          url:string;
        }
      }
    ]
  }
}

const defaultRepo:IRepo = {
  id: "",
  name:"",
  description:"",
  viewerHasStarred:false,
  stargazers:{
    totalCount:0,
  },
  issues:{
    edges:[{
      node:{
        id:"",
        title:"",
        url:""
      }
    }]
  }
}

interface IQueryResult {
  repository: IRepo;
}

const GET_REPO = gql`
  query GetRepo($orgName:String!, $repoName:String!) {
    repository(owner:$orgName, name:$repoName) {
      id
      name
      description
      viewerHasStarred
      stargazers {
        totalCount
      }
      issues(last:5) {
        edges {
          node {
            id
            title
            url
            publishedAt
          }
        }
      }
    }
  }
`

const STAR_REPO = gql`
  mutation($repoId:ID!) {
    addStar(input: {
      starrableId:$repoId
    }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`

const RepoSearch:FC<IProps> = props => {
  const [repo, setRepo] = useState<IRepo>(defaultRepo);
  const [searchError, setSearchError] = useState<String>("");
  const [search, setSearch] = useState<ISearch>({
    orgName: "",
    repoName: ""
  });
  const [getRepo] = useLazyQuery<IQueryResult>(GET_REPO);
  const [starRepo, {loading, error}] = useMutation(STAR_REPO, {
    update(cache ) {
      const data = cache.readQuery<IQueryResult>({
        query: GET_REPO,
        variables: {
          orgName:search.orgName,
          repoName: search.repoName
        }
      });
      if (data === null) {
        return;
      }
      const newData:IRepo = {
        ...data.repository,
        viewerHasStarred:true,
        stargazers: {
          ...data.repository.stargazers,
          totalCount:data.repository.stargazers.totalCount + 1
        }
      }
      cache.writeQuery({
        query: GET_REPO,
        variables: {
          orgName: search.orgName,
          repoName:search.repoName
        },
        data: {
          repository: newData
        }
      });
      setRepo(newData);
    }
  });

  const handleSearch = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // todo - make GraphQL query
    setSearchError("");
    getRepo({
      variables: {
        orgName: search.orgName,
        repoName: search.repoName
      }
    }).then(response => {
      if (response.data) setRepo(response.data.repository);
    }).catch(error => {
      setSearchError(error.message);
    });
  }

  const handleOrgNameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      orgName: e.currentTarget.value
    });
  }

  const handleRepoNameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      repoName: e.currentTarget.value
    });
  }

  const handleAddStarClick = () => {
    if (repo)
      starRepo({
        variables: {
          repoId: repo.id
        }
      });
  }

  return (
    <div className="repo-search">
      <form onSubmit={handleSearch}>
        <label>Organization</label>
        <input 
          type="text"
          onChange={handleOrgNameChange}
          value={search.orgName}
        />
        <label>Repository</label>
        <input
          type="text"
          onChange={handleRepoNameChange}
          value={search.repoName}
        />
        <button type="submit">Search</button>
      </form>
      {repo && repo.id && (
        <div className="repo-item">
          <h4>
            {repo.name} 
            {repo.stargazers ? `${repo.stargazers.totalCount} stars`:""}
          </h4>
          <p>{repo.description}</p>
          <div>
            {!repo.viewerHasStarred && (
              <>
                <button 
                  disabled={loading}
                  onClick={handleAddStarClick}
                >
                  {loading ? "Adding...":"Star!"}
                </button>
                {error && (<div>{error.toString()}</div>)}
              </>
            )}
          </div>
          <div>
            Last 5 issues:
            {repo.issues && repo.issues.edges ? (
              <ul>
                {repo.issues.edges.map(item => (
                  <li key={item.node.id}>
                    {item.node.title}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      )}
      {searchError && <div>{searchError}</div>}
    </div>
  );
}

export default RepoSearch;