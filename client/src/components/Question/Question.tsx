import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

export const GET_QUESTION = gql`
  query GetQuestion($questionId: ID!) {
    anonUserId @client
    question(id: $questionId) {
      id
      text
      minValues
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
      __typename
      success
      message
      answer {
        id
        values
        __typename
      }
    }
  }
`;

interface CreateAnswer {
  createAnswer: {
    __typename: "CreateAnswerResponse";
    success: boolean;
    message: string;
    answer: {
      id: number;
      values: string[];
      __typename: "Answer";
    };
  };
}

const optimisticCreateAnswer = (value: number): CreateAnswer => ({
  createAnswer: {
    __typename: "CreateAnswerResponse",
    success: true,
    message: "",
    answer: {
      id: 123,
      __typename: "Answer",
      values: [`${value}`]
    }
  }
});

const Question = ({ questionId }) => {
  // this should be fetched from the cache so no need to handle loading state
  const { data } = useQuery(GET_QUESTION, { variables: { questionId } });

  const [createAnswer] = useMutation<CreateAnswer>(CREATE_ANSWER);

  const saveAnswer = (value: number) => {
    createAnswer({
      variables: {
        anonUserId: data.anonUserId,
        questionId: questionId,
        values: [`${value}`]
      },

      // update is called twice:
      // firstly with the optimistic response
      // secondly with the server response (with the cache state how it was prior to adding the optimistic response)
      update(cache, { data }: any) {
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
              answers: question.answers.concat(data.createAnswer.answer)
            }
          }
        });
      },

      optimisticResponse: optimisticCreateAnswer(value)
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-red-100">
      <div>Question: {questionId}</div>
      <div>{data.question.text}</div>
      <div>Min values: {data.question.minValues || "n/a"}</div>
      <div className="mt-2">Existing answers:</div>
      {data.question.answers.map(answer => (
        <div key={answer.id}>{answer.values}</div>
      ))}
      <div className="mt-2">Select answers:</div>
      {[1, 2, 3].map(val => (
        <button key={val} onClick={() => saveAnswer(val)}>
          {val}
        </button>
      ))}
    </div>
  );
};

export default Question;
