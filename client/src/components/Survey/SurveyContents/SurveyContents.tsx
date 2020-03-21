import React from "react";
import StartSurvey from "../../StartSurvey/StartSurvey";
import Completed from "../../Completed/Completed";
import Page from "../../Page/Page";

interface Props {
  pageId: string;
  surveyId: string;
  isComplete: boolean;
}

const SurveyContents = ({ pageId, surveyId, isComplete }: Props) => {
  return (
    <>
      {pageId && !isComplete ? (
        <Page pageId={pageId} surveyId={surveyId} />
      ) : !isComplete ? (
        <StartSurvey surveyId={surveyId} />
      ) : (
        <Completed />
      )}
    </>
  );
};

export default SurveyContents;
