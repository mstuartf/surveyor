import React from "react";
import { Route, Switch } from "react-router";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Survey from "../Pages/Survey/Survey";
import Complete from "../Pages/Complete/Complete";
import { brandColor } from "../../brand";

// tested regex: https://pshrmn.github.io/route-tester
// optional question id

// important to have overflow hidden somewhere on draggable stack parent for animations to work

const App = () => {
  return (
    <div
      className={`w-full h-screen m-auto overflow-hidden bg-${brandColor}-100`}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/survey/:surveyId/complete" component={Complete} />
        <Route path="/survey/:surveyId/(page)?/:pageId?" component={Survey} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
