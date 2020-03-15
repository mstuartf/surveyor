import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../App/App";
import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "../../apolloClient";

const Root = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Route component={App} />
      </Router>
    </ApolloProvider>
  );
};

export default Root;
