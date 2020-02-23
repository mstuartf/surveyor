import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import Survey from "./Survey";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/survey/:surveyId" component={Survey} />
        <Route component={Home} />
      </Switch>
    </div>
  );
};

export default App;
