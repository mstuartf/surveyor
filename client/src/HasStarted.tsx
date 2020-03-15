import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router";
import React from "react";
import Survey from "./components/Survey/Survey";

export const GET_USER_ID = gql`
  query HasAnonUser {
    anonUserId @client
  }
`;

// when the user tries to access a survey page (start, question, or complete)
// this component checks whether the survey has been started
// if not, the user is redirected to the start page

const HasStarted = props => {
  const { questionId, surveyId } = props.match.params;
  const isComplete: boolean = questionId === "complete";

  const { data } = useQuery(GET_USER_ID);

  if (questionId && (!data || !data.anonUserId)) {
    return <Redirect to={`/survey/${surveyId}`} />;
  }

  return (
    <Survey
      surveyId={surveyId}
      questionId={questionId}
      isComplete={isComplete}
    />
  );
};

export default HasStarted;
