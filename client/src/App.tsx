import React from "react";
import { Route, Switch } from "react-router";
import Home from "./Home";
import StartSurvey from "./StartSurvey";
import HasStarted from "./HasStarted";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/survey/:surveyId/:questionId" component={HasStarted} />
        <Route path="/survey/:surveyId" component={StartSurvey} />
        <Route component={Home} />
      </Switch>
    </div>
  );
};

export default App;
