import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${import.meta.env.GRAPHQL_AUTH}`
    }
  }
});

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${import.meta.env.GRAPHQL_AUTH}`
  },
  cache: new InMemoryCache()
});