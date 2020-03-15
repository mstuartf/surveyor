import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

export const GET_QUESTION = gql`
  query GetQuestion($questionId: ID!) {
    anonUserId @client
    question(id: $questionId) {
      id
      text
      answers {
        id
        values
      }
    }
  }
`;

export const CREATE_ANSWER = gql`
  mutation CreateAnswer($anonUserId: ID!, $questionId: ID!, $values: [String]) {
    createAnswer(
      anonUserId: $anonUserId
      questionId: $questionId
      values: $values
    ) {
      success
      message
      answer {
        id
        values
      }
    }
  }
`;

const Question = ({ questionId }) => {
  // this should be fetched from the cache so no need to handle loading state
  const { data } = useQuery(GET_QUESTION, { variables: { questionId } });

  const [createAnswer] = useMutation(CREATE_ANSWER, {
    // variables: { anonUserId: data.anonUserId, questionId: questionId },
    update(cache, { data: { createAnswer } }) {
      const { question }: any = cache.readQuery({
        query: GET_QUESTION,
        variables: { questionId }
      });
      cache.writeQuery({
        query: GET_QUESTION,
        variables: { questionId },
        data: {
          question: {
            ...question,
            answers: question.answers.concat(createAnswer.answer)
          }
        }
      });
    }
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-red-100">
      <div>Question: {questionId}</div>
      <div>{data.question.text}</div>
      <div className="mt-2">Existing answers:</div>
      {data.question.answers.map(answer => (
        <div key={answer.id}>{answer.values}</div>
      ))}
      <div className="mt-2">Select answers:</div>
      {[1, 2, 3].map(val => (
        <button
          key={val}
          onClick={() => {
            createAnswer({
              variables: {
                anonUserId: data.anonUserId,
                questionId: questionId,
                values: [`${val}`]
              }
            });
          }}
        >
          {val}
        </button>
      ))}
    </div>
  );
};

export default Question;
