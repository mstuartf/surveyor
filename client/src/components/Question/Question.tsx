import React from "react";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import SingleInput from "../SingleInput/SingleInput";
import Loading from "../Loading/Loading";
import { GET_QUESTION } from "./Question.graphql";
import {
  useQuestionMutationMutation,
  useQuestionQueryQuery
} from "../../generated/graphql";

interface Props {
  questionId: string;
}

const Question = ({ questionId }: Props) => {
  // this should be fetched from the cache so no need to handle loading state
  const { data, client } = useQuestionQueryQuery({
    variables: { questionId }
  });

  const [createAnswer] = useQuestionMutationMutation();

  if (data === undefined) {
    return <Loading />;
  }

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

      optimisticResponse: {
        createAnswer: {
          __typename: "CreateAnswerResponse",
          success: true,
          message: "",
          answer: {
            id: "123",
            __typename: "Answer",
            values
          }
        }
      }
    });
  };

  const wipeMinValuesReminder = () => {
    setTimeout(() => {
      client.writeData({
        data: {
          belowMinValues: [] // todo this should remove the individual ID
        }
      });
    }, 1000);
  };

  if (data.belowMinValues) {
    wipeMinValuesReminder();
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="h-1/4 border w-full flex justify-center items-center">
        {data!.question.text}
      </div>
      <div className="flex-grow border border-red-400 w-full">
        {data.question.possibleValues && data.question.possibleValues.length ? (
          <MultipleChoice
            onSave={saveAnswerValues}
            possibleValues={data.question.possibleValues}
            min={data.question.minValues || 0}
            max={data.question.maxValues || 0}
            minValuesReminder={data.belowMinValues.indexOf(questionId) > -1}
            answer={data.question.answer}
          />
        ) : (
          <SingleInput
            onSave={saveAnswerValues}
            required={!!data.question.minValues}
            requiredReminder={data.belowMinValues.indexOf(questionId) > -1}
            answer={data.question.answer}
          />
        )}
      </div>
    </div>
  );
};

export default Question;
