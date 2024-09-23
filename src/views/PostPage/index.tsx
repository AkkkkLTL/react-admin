import axios, { CancelTokenSource } from "axios";
import { ChangeEvent, FC, useEffect, useState } from "react";

import "./styles.scss"

interface IPost {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

const defaultPosts: IPost[] = [];

const AxiosPostPage:FC = () => {

  // Setting States
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState<string>("");
  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource>();
  const [loading, setLoading] = useState<boolean>(true);
  const [editPost, setEditPost] = useState<IPost>({
    body: "",
    title: "",
    userId: 1
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const cancelTokenSource = cancelToken.source();
    setCancelTokenSource(cancelTokenSource);

    axios.get<IPost[]>("https://jsonplaceholder.typicode.com/posts",{
      cancelToken: cancelTokenSource.token,
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 5000
    })
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(ex => {
        const error = axios.isCancel(ex)
          ? "Request cancelled" : ex.code === "ECONNABORTED" 
          ? "A timeout has occurred" : ex.response.status === 404
          ? "Resource not found" : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("User canceled operation");
    }
  }

  const handleTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setEditPost({
      ...editPost,
      title:e.currentTarget.value
    });
  }

  const handleBodyChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setEditPost({
      ...editPost,
      body: e.currentTarget.value
    });
  }

  const handleSaveClick = () => {
    if (editPost.id) {
      // TODO - make a PUT request
      axios.put<IPost>(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`,
        editPost,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(() => {
        setEditPost({body:"", title:"",userId:1});
        setPosts(posts.filter(post => post.id !== editPost.id).concat(editPost));
      });
    } else {
      axios.post<IPost>("https://jsonplaceholder.typicode.com/posts", {
        body: editPost.body,
        title: editPost.title,
        userId: editPost.userId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        setPosts(posts.concat(response.data));
      });
    }
  }

  const handleUpdateClick = (post:IPost) => {
    setEditPost(post);
  }

  const handleDeleteClick = (post:IPost) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
    .then(() => {
      setPosts(posts.filter(p => p.id !== post.id));
    });
  }
  return (
    <>
      <div className='post-edit'>
        <input
          type='text'
          placeholder='Enter title'
          value={editPost.title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder='Enter body'
          value={editPost.body}
          onChange={handleBodyChange}
        />
        <button
          onClick={handleSaveClick}
        >Save</button>
      </div>
      {loading && (
        <button onClick={handleCancelClick}>Cancel</button>
      )}
      <ul className="posts" data-testid="posts">{posts.map(post => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => handleUpdateClick(post)}>Update</button>
          <button onClick={() => handleDeleteClick(post)}>Delete</button>
        </li>
      ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </>
  )
}

export default AxiosPostPage;