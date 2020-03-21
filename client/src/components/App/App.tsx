import React from "react";
import { Route, Switch } from "react-router";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import Survey from "../Survey/Survey";

// tested regex: https://pshrmn.github.io/route-tester
// optional question id

// important to have overflow hidden somewhere on draggable stack parent for animations to work

const App = () => {
  return (
    <div className="p-8 w-full h-screen m-auto overflow-hidden">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/survey/:surveyId/(page)?/:pageId?" component={Survey} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
