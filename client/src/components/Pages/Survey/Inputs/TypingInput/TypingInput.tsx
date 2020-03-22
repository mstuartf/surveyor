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
    question: { answer, minValues }
  } = data!;

  const value = answer ? answer.values[0] : "";

  return (
    <div className="flex py-4 justify-center">
      <DebouncedInput initialValue={value} callback={v => onSave([v])}>
        {children}
      </DebouncedInput>
    </div>
  );
};

export default TypingInput;
