import React from "react";
import { GQLAnswer } from "../../generated/graphql";
import { DebouncedInput } from "../DebouncedInput";

interface Props {
  requiredReminder: boolean;
  required: boolean;
  answer?: GQLAnswer | null;
  onSave: Function;
}

const SingleInput = ({ requiredReminder, required, answer, onSave }: Props) => {
  const value = answer ? answer.values[0] : "";

  return (
    <>
      <div className="mt-2">Input answer</div>
      <DebouncedInput initialValue={value} callback={v => onSave([v])} />
      {required && (
        <div className={requiredReminder ? "text-red-600 underline" : ""}>
          Required
        </div>
      )}
    </>
  );
};

export default SingleInput;
