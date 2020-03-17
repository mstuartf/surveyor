import React from "react";

const MultipleChoice = ({
  minValuesReminder,
  min,
  max = 0,
  answer,
  possibleValues,
  onSave
}) => {
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
    values = values.slice(Math.max(values.length - max, 0));
    onSave(values);
  };

  return (
    <>
      <div className={minValuesReminder ? "text-red-600 underline" : ""}>
        Min values: {min || "n/a"}
      </div>
      <div>Max values: {max || "n/a"}</div>
      <div className="mt-2">Select answers:</div>
      {possibleValues.map(option => (
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
    </>
  );
};

export default MultipleChoice;
