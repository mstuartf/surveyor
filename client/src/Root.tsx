import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import { resolvers, typeDefs } from "./resolvers";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      anonUser: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: "AnonUser", id: args.id })
    }
  }
});

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  clientState: {
    cache,
    resolvers,
    typeDefs,
    defaults: {
      cardEntryDirection: 1 // default to sliding in from the right
    }
  }
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route component={App} />
      </Router>
    </ApolloProvider>
  );
};

export default Root;
