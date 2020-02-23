import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_SESSION = gql`
  query GetSession($sessionId: ID!) {
    session(id: $sessionId) {
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
          value
        }
      }
    }
  }
`;

const Survey = ({ sessionId }) => {
  const { loading, error, data } = useQuery(GET_SESSION, {
    variables: { sessionId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const session = data.session;

  return (
    <div>
      <div>Session: {session.id}</div>
      <div>Survey: {session.survey.name}</div>
      <div>Questions:</div>
      {session.questions.map(question => (
        <div key={question.id}>
          {question.text}
          <div>Answers:</div>
          {question.answers.map(answer => (
            <div key={answer.id}>{answer.value}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Survey;
