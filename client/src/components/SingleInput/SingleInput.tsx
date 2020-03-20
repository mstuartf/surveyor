import React from "react";
import { GQLAnswer } from "../../generated/graphql";
import { DebouncedInput } from "../DebouncedInput";

interface Props {
  minValuesReminder: boolean;
  min: number;
  answer?: GQLAnswer | null;
  onSave: Function;
}

const SingleInput = ({ minValuesReminder, min, answer, onSave }: Props) => {
  const value = answer ? answer.values[0] : "";

  return (
    <>
      <div className="mt-2">Input answer</div>
      <DebouncedInput initialValue={value} callback={v => onSave([v])} />
    </>
  );
};

export default SingleInput;
