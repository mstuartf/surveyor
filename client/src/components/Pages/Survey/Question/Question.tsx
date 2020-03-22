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
import QuestionText from "../../../Generic/QuestionText";
import ReminderText from "../../../Generic/ReminderText";

interface Props {
  questionId: string;
}

const Question = ({ questionId }: Props) => {
  const { data } = useQuestionQueryQuery({
    variables: { questionId }
  });

  const [createAnswer] = useQuestionMutationMutation();

  const { question, anonUserId } = data!;

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

  const inputStyling =
    "bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500";

  return (
    <div className="w-full flex flex-col items-center justify-center pb-6">
      <div className="w-full flex flex-col justify-center items-center px-4 pt-2 pb-4 text-center">
        <QuestionText>
          {question.minValues ? `${question.text}*` : question.text}
        </QuestionText>
      </div>
      {question.instructions && (
        <div className="w-full flex flex-col justify-center items-center px-4 pt-2 pb-4 text-center">
          <ReminderText>{question.instructions}</ReminderText>
        </div>
      )}
      <div className="flex-grow w-full">
        {["CHOICE"].indexOf(question.type) > -1 && (
          <MultipleChoice onSave={saveAnswerValues} questionId={questionId} />
        )}
        {["TEXT", "NUMBER", "EMAIL"].indexOf(question.type) > -1 && (
          <TypingInput onSave={saveAnswerValues} questionId={questionId}>
            <input
              type={question.type.toLowerCase()}
              className={
                question.type === "NUMBER"
                  ? `${inputStyling} text-center`
                  : `${inputStyling} text-center w-full`
              }
            />
          </TypingInput>
        )}
        {["TEXTAREA"].indexOf(question.type) > -1 && (
          <TypingInput onSave={saveAnswerValues} questionId={questionId}>
            <textarea className={`${inputStyling} w-full resize-none`} rows={5}>
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
