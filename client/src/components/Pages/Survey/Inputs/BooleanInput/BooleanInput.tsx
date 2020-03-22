import React from "react";
import { useInputQueryQuery } from "../../../../../generated/graphql";
import Flicker from "../../Flicker/Flicker";

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
    question: { answer, minValues }
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
        <Flicker questionId={questionId} reminderClass="text-red-700">
          <div>Required</div>
        </Flicker>
      )}
    </>
  );
};

export default BooleanInput;
