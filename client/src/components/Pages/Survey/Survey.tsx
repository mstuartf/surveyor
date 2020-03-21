import React from "react";
import SurveyAuth from "./SurveyAuth/SurveyAuth";

// access through this survey component to make it easier to change the auth logic
// e.g. caching sessions, etc.

const Survey = props => <SurveyAuth {...props} />;

export default Survey;
