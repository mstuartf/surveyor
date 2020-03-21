import React from "react";
import { useInputQueryQuery } from "../../../../../generated/graphql";
import { DebouncedInput } from "../../../../Generic/DebouncedInput/DebouncedInput";

interface Props {
  questionId: string;
  onSave: (values: string[]) => void;
  children: React.ReactNode;
}

const TypingInput = ({ questionId, onSave, children }: Props) => {
  const { data } = useInputQueryQuery({
    variables: { questionId }
  });

  const {
    question,
    question: { answer, minValues },
    belowMinValues
  } = data!;

  const value = answer ? answer.values[0] : "";

  return (
    <>
      <div className="mt-2">Input answer ({question.type}):</div>
      <DebouncedInput initialValue={value} callback={v => onSave([v])}>
        {children}
      </DebouncedInput>
      {!!minValues && (
        <div
          className={
            belowMinValues.indexOf(questionId) > -1
              ? "text-red-600 underline"
              : ""
          }
        >
          Required
        </div>
      )}
    </>
  );
};

export default TypingInput;
