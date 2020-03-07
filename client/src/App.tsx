import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import StartSurvey from "./StartSurvey";
import HasStarted from "./HasStarted";
import Completed from "./Completed";
import NotFound from "./NotFound";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/survey/:surveyId/:questionId" component={HasStarted} />
        <Route path="/survey/:surveyId" component={StartSurvey} />
        <Route path="/completed/:surveyId" component={Completed} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
