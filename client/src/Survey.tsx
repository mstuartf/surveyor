import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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

const Survey = ({ anonUserId }) => {
  const { loading, error, data } = useQuery(GET_ANON_USER, {
    variables: { anonUserId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const anonUser = data.anonUser;

  return (
    <div>
      <div>AnonUser: {anonUser.id}</div>
      <div>Survey: {anonUser.survey.name}</div>
      <div>Questions:</div>
      {anonUser.questions.map(question => (
        <div key={question.id}>{question.text}</div>
      ))}
    </div>
  );
};

export default Survey;
