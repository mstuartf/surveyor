import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Redirect, useHistory } from "react-router-dom";

export const GET_ANON_USER = gql`
  query GetAnonUser($anonUserId: ID!) {
    anonUser(id: $anonUserId) {
      id
      survey {
        id
        name
      }
      questions {
        id
        text
        answers {
          id
          values
        }
      }
    }
  }
`;

const Question = ({ anonUserId, questionId }) => {
  const { data } = useQuery(GET_ANON_USER, { variables: { anonUserId } });

  const history = useHistory();

  const anonUser = data.anonUser;

  const next = anonUser.questions
    .sort()
    .find(question => question.id > questionId);

  const nextQuestion = () => {
    if (next) {
      history.push(`/survey/${anonUser.survey.id}/${next.id}`);
    } else {
      history.push("/home");
    }
  };

  if (!questionId) {
    return <Redirect to={`/survey/${anonUser.survey.id}/${next.id}`} />;
  }

  return (
    <div>
      <div>AnonUser: {anonUser.id}</div>
      <div>Survey: {anonUser.survey.name}</div>
      <div>Question: {questionId}</div>
      <button onClick={() => nextQuestion()}>next</button>
    </div>
  );
};

export default Question;
