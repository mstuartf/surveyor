import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router";
import React from "react";
import SurveyNav from "./SurveyNav";
import Loading from "../Loading/Loading";

export const GET_USER_ID = gql`
  query HasAnonUser($surveyId: ID!) {
    anonUserId @client
    survey(id: $surveyId) {
      id
      name
      questions {
        id
        text
        minValues
        answer {
          id
          values
        }
      }
    }
  }
`;

interface HasAnonUser {
  anonUserId: number;
  survey: {
    id: number;
    name: string;
    questions: {
      id: number;
      text: string;
      minValues;
      answer: {
        id: number;
        values: string[];
      }[];
    }[];
  };
}

// when the user tries to access a survey page (start, question, or complete)
// this component checks whether the survey has been started
// if not, the user is redirected to the start page

const Survey = props => {
  const { questionId, surveyId } = props.match.params;
  const isComplete: boolean = questionId === "complete";

  const { data, loading } = useQuery<HasAnonUser>(GET_USER_ID, {
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
    <SurveyNav
      surveyId={surveyId}
      questionId={questionId}
      isComplete={isComplete}
      belowMinValues={belowMinValues}
    />
  );
};

export default Survey;
