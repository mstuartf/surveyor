import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import NotFound from "./NotFound";
import HasStarted from "./HasStarted";

// tested regex: https://pshrmn.github.io/route-tester
// optional question id

const App = () => {
  return (
    <div className="App h-full">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/survey/:surveyId/(question)?/:questionId?"
          component={HasStarted}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
