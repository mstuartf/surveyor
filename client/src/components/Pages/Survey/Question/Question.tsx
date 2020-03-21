import React from "react";
import MultipleChoice from "../Inputs/MultipleChoice/MultipleChoice";
import TypingInput from "../Inputs/TypingInput/TypingInput";
import { GET_QUESTION } from "./Question.graphql";
import {
  useQuestionMutationMutation,
  useQuestionQueryQuery
} from "../../../../generated/graphql";
import BooleanInput from "../Inputs/BooleanInput/BooleanInput";
import DropDown from "../Inputs/DropDown/DropDown";

interface Props {
  questionId: string;
}

const Question = ({ questionId }: Props) => {
  const { data, client } = useQuestionQueryQuery({
    variables: { questionId }
  });

  const [createAnswer] = useQuestionMutationMutation();

  const { question, anonUserId, belowMinValues } = data!;

  const saveAnswerValues = (values: string[]) => {
    createAnswer({
      variables: {
        anonUserId,
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

  if (belowMinValues) {
    wipeMinValuesReminder();
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="h-1/4 border w-full flex justify-center items-center">
        {question.text}
      </div>
      <div className="flex-grow border border-red-400 w-full">
        {["CHOICE"].indexOf(question.type) > -1 && (
          <MultipleChoice onSave={saveAnswerValues} questionId={questionId} />
        )}
        {["TEXT", "NUMBER", "EMAIL"].indexOf(question.type) > -1 && (
          <TypingInput onSave={saveAnswerValues} questionId={questionId}>
            <input
              type={question.type.toLowerCase()}
              className="border rounded shadow-md"
            />
          </TypingInput>
        )}
        {["TEXTAREA"].indexOf(question.type) > -1 && (
          <TypingInput onSave={saveAnswerValues} questionId={questionId}>
            <textarea className="border rounded shadow-md resize-none" rows={3}>
              ...
            </textarea>
          </TypingInput>
        )}
        {["BOOLEAN"].indexOf(question.type) > -1 && (
          <BooleanInput questionId={questionId} onSave={saveAnswerValues} />
        )}
        {["DROPDOWN"].indexOf(question.type) > -1 && (
          <DropDown questionId={questionId} onSave={saveAnswerValues} />
        )}
      </div>
    </div>
  );
};

export default Question;