import React from "react";
import StartSurvey from "../../../Pages/StartSurvey/StartSurvey";
import Completed from "../../../Pages/Completed/Completed";
import Section from "../Section/Section";

interface Props {
  pageId: string;
  surveyId: string;
  isComplete: boolean;
}

const SurveyContents = ({ pageId, surveyId, isComplete }: Props) => {
  return (
    <>
      {pageId && !isComplete ? (
        <Section pageId={pageId} surveyId={surveyId} />
      ) : !isComplete ? (
        <StartSurvey surveyId={surveyId} />
      ) : (
        <Completed />
      )}
    </>
  );
};

export default SurveyContents;
