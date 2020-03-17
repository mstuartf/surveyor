import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

export const GET_QUESTION = gql`
  query GetQuestion($questionId: ID!) {
    anonUserId @client
    minValuesReminder @client
    question(id: $questionId) {
      id
      text
      minValues
      answer {
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
  const { data, client } = useQuery(GET_QUESTION, {
    variables: { questionId }
  });

  const [createAnswer] = useMutation<CreateAnswer>(CREATE_ANSWER);

  // todo this should save all values depending on allowed number of values logic and remove a value if it is clicked twice
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
              answer: data.createAnswer.answer
            }
          }
        });
      },

      optimisticResponse: optimisticCreateAnswer(value)
    });
  };

  const wipeMinValuesReminder = () => {
    setTimeout(() => {
      client.writeData({
        data: {
          minValuesReminder: false
        }
      });
    }, 1000);
  };

  if (data.minValuesReminder) {
    wipeMinValuesReminder();
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-red-100">
      <div>Question: {questionId}</div>
      <div>{data.question.text}</div>
      <div className={data.minValuesReminder ? "text-red-600 underline" : ""}>
        Min values: {data.question.minValues || "n/a"}
      </div>
      <div className="mt-2">Existing answer values:</div>
      {(data.question.answer ? data.question.answer.values : []).map(value => (
        <div key={value}>{value}</div>
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
