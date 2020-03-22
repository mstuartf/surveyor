import React from "react";
import StartSurvey from "../../../Pages/StartSurvey/StartSurvey";
import Submit from "../../../Pages/Submit/Submit";
import SurveyPage from "../SurveyPage/SurveyPage";

interface Props {
  pageId: string;
  surveyId: string;
  submit: boolean;
}

const SurveyContents = ({ pageId, surveyId, submit }: Props) => {
  return (
    <>
      {pageId && !submit ? (
        <SurveyPage pageId={pageId} surveyId={surveyId} />
      ) : !submit ? (
        <StartSurvey surveyId={surveyId} />
      ) : (
        <Submit surveyId={surveyId} />
      )}
    </>
  );
};

export default SurveyContents;
