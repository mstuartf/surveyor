import React from "react";
import StartSurvey from "../StartSurvey/StartSurvey";
import Completed from "../Completed/Completed";
import Question from "../Question/Question";

const SurveyInner = ({ questionId, surveyId, isComplete }) => {
  return (
    <>
      {questionId && !isComplete ? (
        <Question questionId={questionId} />
      ) : !isComplete ? (
        <StartSurvey surveyId={surveyId} />
      ) : (
        <Completed />
      )}
    </>
  );
};

export default SurveyInner;
