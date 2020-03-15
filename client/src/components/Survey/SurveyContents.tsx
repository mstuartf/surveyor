import React from "react";
import StartSurvey from "../../StartSurvey";
import Completed from "../../Completed";
import Question from "../Question/Question";

const SurveyContents = ({ questionId, surveyId, isComplete }) => {
  return (
    <>
      {questionId ? (
        <Question questionId={questionId} />
      ) : !isComplete ? (
        <StartSurvey surveyId={surveyId} />
      ) : (
        <Completed />
      )}
    </>
  );
};

export default SurveyContents;
