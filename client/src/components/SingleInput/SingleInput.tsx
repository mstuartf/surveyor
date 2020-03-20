import React from "react";
import { GQLAnswer } from "../../generated/graphql";

interface Props {
  minValuesReminder: boolean;
  min: number;
  answer?: GQLAnswer | null;
  onSave: Function;
}

const SingleInput = ({ minValuesReminder, min, answer, onSave }: Props) => {
  let timer;

  const saveValueDebounce = (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      saveValue(value);
    }, 300);
  };

  const saveValue = (value: string) => {
    onSave([value]);
  };

  const value = answer ? answer.values[0] : "";

  return (
    <>
      <div className="mt-2">Input answer</div>
      <input
        value={value}
        onChange={event => saveValueDebounce(event.target.value)}
      />
    </>
  );
};

export default SingleInput;
