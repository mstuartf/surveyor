import React, { ChangeEvent } from "react";
import { useDropDownQueryQuery } from "../../../../../generated/graphql";
import { sortResource } from "../../../../../pagination";

interface Props {
  questionId: string;
  onSave: (values: string[]) => void;
}

const DropDown = ({ questionId, onSave }: Props) => {
  const { data } = useDropDownQueryQuery({
    variables: { questionId }
  });

  const {
    question: { answer, possibleValues },
    belowMinValues
  } = data!;

  const selectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    onSave([event.target.value]);
  };

  const value = answer ? answer.values[0] : "";

  return (
    <>
      <div
        className={
          belowMinValues.indexOf(questionId) > -1
            ? "text-red-600 underline"
            : ""
        }
      >
        Required
      </div>
      <div className="mt-2">Select answers:</div>
      <select
        className="flex flex-col mt-2"
        onChange={e => selectValue(e)}
        value={value}
      >
        <option value="">-</option>
        {sortResource(possibleValues!).map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
