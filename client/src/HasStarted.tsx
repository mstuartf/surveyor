import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Question from "./Question";
import { Redirect } from "react-router";
import React from "react";

export const HAS_ANON_USER = gql`
  query HasAnonUser {
    anonUserId @client
    direction @client
  }
`;

const HasStarted = props => {
  const { data } = useQuery(HAS_ANON_USER);
  const { questionId, surveyId } = props.match.params;

  if (data && data.anonUserId) {
    return (
      <Question
        anonUserId={data.anonUserId}
        questionId={questionId}
        direction={data.direction}
      />
    );
  }

  return <Redirect to={`/survey/${surveyId}`} />;
};

export default HasStarted;
