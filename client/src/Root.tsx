import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import { resolvers, typeDefs } from "./resolvers";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/",
  resolvers,
  typeDefs
});

// const sessionStr = localStorage.getItem('session');
// const sessionId = sessionStr ? JSON.parse(sessionStr).id : null;

cache.writeData({
  data: {
    sessionId: null
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
