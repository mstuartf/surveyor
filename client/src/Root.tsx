import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import { resolvers, typeDefs } from "./resolvers";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { CardEntryDirection } from "./components/DraggableStack/variants";

interface ClientData {
  cardEntryDirection: CardEntryDirection;
  anonUserId: number | null;
}

const defaults: ClientData = {
  cardEntryDirection: "fromRight", // default to sliding in from the right
  anonUserId: null
};

// In some cases, a query requests data that already exists in the client store under a different key.
// A very common example of this is when your UI has a list view and a detail view that both use the same data.
// https://www.apollographql.com/docs/react/caching/cache-interaction/#cache-redirects-with-cacheredirects
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      question: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: "Question", id: args.id })
    }
  }
});

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache, // don't put this inside of clientState or you can't cache network data
  clientState: {
    resolvers,
    typeDefs,
    defaults
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
