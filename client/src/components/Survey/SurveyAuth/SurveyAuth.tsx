import { gql } from "apollo-boost";
import { Redirect, RouteComponentProps } from "react-router";
import React from "react";
import SurveyNavigation from "../SurveyNavigation/SurveyNavigation";
import Loading from "../../Loading/Loading";
import { useSurveyAuthQueryQuery } from "../../../generated/graphql";

export const GET_USER_ID = gql`
  query SurveyAuthQuery($surveyId: ID!) {
    anonUserId @client
    survey(id: $surveyId) {
      id
      name
      questions {
        id
        text
        minValues
        maxValues
        answer {
          id
          values
        }
        possibleValues {
          id
          label
          value
        }
      }
    }
  }
`;

interface MatchParams {
  surveyId: string;
  questionId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

// when the user tries to access a survey page (start, question, or complete)
// this component checks whether the survey has been started
// if not, the user is redirected to the start page

const SurveyAuth = (props: Props) => {
  const { questionId, surveyId } = props.match.params;
  const isComplete: boolean = questionId === "complete";

  const { data, loading } = useSurveyAuthQueryQuery({
    variables: { surveyId }
  });

  if (loading) {
    return <Loading />;
  }

  if (questionId && (!data || !data.anonUserId)) {
    return <Redirect to={`/survey/${surveyId}`} />;
  }

  // @ts-ignore
  const question = data.survey.questions.find(
    question => question.id === questionId
  );
  // @ts-ignore
  const belowMinValues: boolean = question
    ? !!question.minValues &&
      (!question.answer || question.answer.values.length < question.minValues)
    : false;

  return (
    <SurveyNavigation
      surveyId={surveyId}
      questionId={questionId}
      isComplete={isComplete}
      belowMinValues={belowMinValues}
    />
  );
};

export default SurveyAuth;
