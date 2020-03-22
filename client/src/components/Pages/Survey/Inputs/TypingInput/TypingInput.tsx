import React from "react";
import { useInputQueryQuery } from "../../../../../generated/graphql";
import { DebouncedInput } from "../../../../Generic/DebouncedInput/DebouncedInput";
import ReminderText from "../../../../Generic/ReminderText";

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
    question: { answer, minValues }
  } = data!;

  const value = answer ? answer.values[0] : "";

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center py-4">
        <ReminderText>This question is required!</ReminderText>
      </div>
      <div className="flex py-4 justify-center">
        <DebouncedInput initialValue={value} callback={v => onSave([v])}>
          {children}
        </DebouncedInput>
      </div>
    </div>
  );
};

export default TypingInput;
