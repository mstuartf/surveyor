import React from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import SingleInput from "../SingleInput/SingleInput";

export const GET_QUESTION = gql`
  query GetQuestion($questionId: ID!) {
    anonUserId @client
    minValuesReminder @client
    question(id: $questionId) {
      id
      text
      minValues
      maxValues
      answer {
        id
        values
      }
      possibleValues {
        id
        label
        value
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

const optimisticCreateAnswer = (values: string[]): CreateAnswer => ({
  createAnswer: {
    __typename: "CreateAnswerResponse",
    success: true,
    message: "",
    answer: {
      id: 123,
      __typename: "Answer",
      values
    }
  }
});

const Question = ({ questionId }) => {
  // this should be fetched from the cache so no need to handle loading state
  const { data, client } = useQuery(GET_QUESTION, {
    variables: { questionId }
  });

  const [createAnswer] = useMutation<CreateAnswer>(CREATE_ANSWER);

  const saveAnswerValues = (values: string[]) => {
    createAnswer({
      variables: {
        anonUserId: data.anonUserId,
        questionId: questionId,
        values
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

      optimisticResponse: optimisticCreateAnswer(values)
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
      {data.question.possibleValues.length ? (
        <MultipleChoice
          onSave={saveAnswerValues}
          possibleValues={data.question.possibleValues}
          min={data.question.minValues}
          max={data.question.maxValues}
          minValuesReminder={data.minValuesReminder}
          answer={data.question.answer}
        />
      ) : (
        <SingleInput
          onSave={saveAnswerValues}
          minValues={data.question.minValues}
          minValuesReminder={data.minValuesReminder}
          answer={data.question.answer}
        />
      )}
    </div>
  );
};

export default Question;
