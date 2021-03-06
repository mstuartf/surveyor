import { Redirect, RouteComponentProps } from "react-router";
import React from "react";
import SurveyNavigation from "../SurveyNavigation/SurveyNavigation";
import Loading from "../../../Generic/Loading/Loading";
import { useSurveyAuthQueryQuery } from "../../../../generated/graphql";
import NotFound from "../../../Pages/NotFound/NotFound";

interface Props
  extends RouteComponentProps<{ surveyId: string; pageId: string }> {}

// when the user tries to access a survey page (start, question, or complete)
// this component checks whether the survey has been started
// if not, the user is redirected to the start page

const SurveyAuth = (props: Props) => {
  const { pageId, surveyId } = props.match.params;
  const submit: boolean = pageId === "submit";

  const { data, error } = useSurveyAuthQueryQuery({
    variables: { surveyId }
  });

  if (error) {
    return <NotFound />;
  }

  if (!data) {
    return <Loading />;
  }

  if (pageId && !data.anonUserId) {
    return <Redirect to={`/survey/${surveyId}`} />;
  }

  // todo: how to force .find not to return possibly undefined
  const page = data.survey.pages.find(page => page.id === pageId);

  // all question IDs missing min values on current page
  const belowMinValues: string[] = (page ? page.questions : [])
    .filter(
      q => q.minValues && (!q.answer || q.answer.values.length < q.minValues)
    )
    .map(q => q.id);

  return (
    <SurveyNavigation
      surveyId={surveyId}
      pageId={pageId}
      submit={submit}
      belowMinValues={belowMinValues}
    />
  );
};

export default SurveyAuth;
