import React from "react";
import { useMultipleChoiceQueryQuery } from "../../../../../generated/graphql";
import { sortResource } from "../../../../../pagination";
import { brandColor } from "../../../../../brand";

interface Props {
  questionId: string;
  onSave: (values: string[]) => void;
}

const MultipleChoice = ({ questionId, onSave }: Props) => {
  const { data } = useMultipleChoiceQueryQuery({
    variables: { questionId }
  });

  const {
    question: { answer, maxValues, possibleValues }
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

  const shared = `block border border-${brandColor}-500 rounded py-3 px-4 leading-tight focus:outline-none`;
  const unselected = `text-${brandColor}-500`;
  const selected = `text-white bg-${brandColor}-500`;

  return (
    <div className="grid grid-cols-1 gap-4 py-8">
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
  );
};

export default MultipleChoice;
