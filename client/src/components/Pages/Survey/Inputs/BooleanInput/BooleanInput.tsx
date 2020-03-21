import React from "react";
import { useInputQueryQuery } from "../../../../../generated/graphql";

interface Props {
  questionId: string;
  onSave: (values: string[]) => void;
}

const BooleanInput = ({ questionId, onSave }: Props) => {
  const { data } = useInputQueryQuery({
    variables: { questionId }
  });

  const {
    question,
    question: { answer, minValues },
    belowMinValues
  } = data!;

  const toggleValue = value => {
    let values: string[];
    if (answer && answer.values.indexOf(value) > -1) {
      values = [];
    } else {
      values = [value];
    }
    onSave(values);
  };

  const value = answer && answer.values[0];

  return (
    <>
      <div className="mt-2">Input answer ({question.type}):</div>
      <button
        className={value === "true" ? "bg-blue-400" : ""}
        onClick={() => toggleValue("true")}
      >
        True
      </button>
      <button
        className={value === "false" ? "bg-blue-400" : ""}
        onClick={() => toggleValue("false")}
      >
        False
      </button>
      {!!minValues && (
        <div
          className={
            belowMinValues.indexOf(questionId) > -1
              ? "text-red-600 underline"
              : ""
          }
        >
          Required
        </div>
      )}
    </>
  );
};

export default BooleanInput;
