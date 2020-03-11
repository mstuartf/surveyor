import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import NotFound from "./NotFound";
import Survey from "./Survey";

const App = () => {
  return (
    <div className="App h-full">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/survey/:surveyId/question/:questionId"
          component={Survey}
        />
        <Route path="/survey/:surveyId/complete" component={Survey} />
        <Route path="/survey/:surveyId" component={Survey} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
