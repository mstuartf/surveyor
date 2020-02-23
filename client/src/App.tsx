import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import Survey from "./Survey";
import Session from "./Session";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const HAS_SESSION = gql`
  query HasSession {
    sessionId @client
  }
`;

function HasSession() {
  const { data } = useQuery(HAS_SESSION);
  return data.sessionId ? <Survey sessionId={data.sessionId} /> : <Session />;
}

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/survey/:surveyId" component={HasSession} />
        <Route component={Home} />
      </Switch>
    </div>
  );
};

export default App;
