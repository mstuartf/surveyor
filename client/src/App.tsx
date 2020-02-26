import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import HasSession from "./HasSession";

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
