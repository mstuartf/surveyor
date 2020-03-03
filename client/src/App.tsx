import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import CheckAnonUserCreated from "./CheckAnonUserCreated";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/survey/:surveyId" component={CheckAnonUserCreated} />
        <Route component={Home} />
      </Switch>
    </div>
  );
};

export default App;
