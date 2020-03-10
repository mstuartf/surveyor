import React from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { Redirect, useHistory } from "react-router-dom";
import CardStack from "./components/CardStack/CardStack";

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

const Question = ({ anonUserId, questionId, direction }) => {
  const client = useApolloClient();

  const { data } = useQuery(GET_ANON_USER, { variables: { anonUserId } });
  const { questions, survey } = data.anonUser;

  const history = useHistory();
  const nextId = questions
    .map(q => q.id)
    .sort()
    .find(id => id > questionId);
  const prevId = questions
    .map(q => q.id)
    .sort()
    .reverse()
    .find(id => id < questionId);

  const nextQuestion = (next: boolean) => {
    if (next && nextId) {
      history.push(`/survey/${survey.id}/${nextId}`);
    } else if (next) {
      history.push(`/completed/${survey.id}/`);
    } else if (prevId) {
      history.push(`/survey/${survey.id}/${prevId}`);
    }
    client.writeData({
      data: {
        direction: next ? 1 : -1
      }
    });
  };

  if (!questionId) {
    return <Redirect to={`/survey/${survey.id}/${nextId}`} />;
  }

  return (
    <div className="border border-dashed border-gray-300 rounded overflow-hidden p-8 w-full max-w-lg h-full max-h-2xl m-auto mt-16">
      <div className="w-full h-full relative">
        <CardStack
          val={questionId}
          direction={direction}
          nextCard={() => nextQuestion(true)}
          previousCard={() => nextQuestion(false)}
        >
          <div className="w-full h-full border border-gray-300 rounded bg-white box-border shadow-md">
            {questionId}
          </div>
        </CardStack>
      </div>
    </div>
  );
};

export default Question;
