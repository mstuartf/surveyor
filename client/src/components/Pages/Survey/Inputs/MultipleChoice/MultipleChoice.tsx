import React from "react";
import { useMultipleChoiceQueryQuery } from "../../../../../generated/graphql";
import { sortResource } from "../../../../../pagination";
import ReminderText from "../../../../Generic/ReminderText";

interface Props {
  questionId: string;
  onSave: (values: string[]) => void;
}

const MultipleChoice = ({ questionId, onSave }: Props) => {
  const { data } = useMultipleChoiceQueryQuery({
    variables: { questionId }
  });

  const {
    question: { answer, minValues, maxValues, possibleValues }
  } = data!;

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

  const shared = "focus:outline-none rounded-lg font-light px-2 py-4";
  const unselected = "text-purple-500 border border-purple-500";
  const selected = "text-white bg-purple-500 border border-purple-500";

  return (
    <>
      <div className="flex items-center justify-center py-4">
        <ReminderText>{`Choose ${minValues}-${maxValues} options.`}</ReminderText>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">
        {sortResource(possibleValues!).map(option => (
          <button
            className={
              answer && answer.values.indexOf(option.value) > -1
                ? `${shared} ${selected}`
                : `${shared} ${unselected}`
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
