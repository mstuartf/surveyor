import React from "react";
import { useMultipleChoiceQueryQuery } from "../../generated/graphql";
import Loading from "../Loading/Loading";
import { sortResource } from "../../pagination";

interface Props {
  questionId: string;
  onSave: Function;
}

const MultipleChoice = ({ questionId, onSave }: Props) => {
  const { data } = useMultipleChoiceQueryQuery({
    variables: { questionId }
  });

  if (!data) {
    return <Loading />;
  }

  const {
    question: { answer, minValues, maxValues, possibleValues },
    belowMinValues
  } = data;

  const toggleValue = value => {
    let values: string[];
    if (answer) {
      if (answer.values.indexOf(value) > -1) {
        values = answer.values.filter(val => val !== value);
      } else {
        values = [...answer.values, value];
      }
    } else {
      values = [value];
    }

    values = values.slice(-(maxValues || 0));

    onSave(values);
  };

  return (
    <>
      <div
        className={
          belowMinValues.indexOf(questionId) > -1
            ? "text-red-600 underline"
            : ""
        }
      >
        Min values: {minValues || "n/a"}
      </div>
      <div>Max values: {maxValues || "n/a"}</div>
      <div className="mt-2">Select answers:</div>
      <div className="flex flex-col mt-2">
        {sortResource(possibleValues!).map(option => (
          <button
            className={
              answer && answer.values.indexOf(option.value) > -1
                ? "bg-red-500"
                : ""
            }
            key={option.value}
            onClick={() => toggleValue(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default MultipleChoice;
