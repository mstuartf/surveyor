import React from "react";
import StartSurvey from "../../../Pages/StartSurvey/StartSurvey";
import Submit from "../../../Pages/Submit/Submit";
import Section from "../Section/Section";

interface Props {
  pageId: string;
  surveyId: string;
  submit: boolean;
}

const SurveyContents = ({ pageId, surveyId, submit }: Props) => {
  return (
    <>
      {pageId && !submit ? (
        <Section pageId={pageId} surveyId={surveyId} />
      ) : !submit ? (
        <StartSurvey surveyId={surveyId} />
      ) : (
        <Submit surveyId={surveyId} />
      )}
    </>
  );
};

export default SurveyContents;
