import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer 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`
    }
  }
});

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer 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`
  },
  cache: new InMemoryCache()
});