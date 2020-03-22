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
  const shared = "h-20 w-20 focus:outline-none rounded-lg font-light";
  const unselected = "text-purple-500 border border-purple-500";
  const selected = "text-white bg-purple-500 border border-purple-500";

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center py-4 text-purple-500 text-sm font-hairline invisible">
        <Flicker questionId={questionId} reminderClass="visible">
          <div>This question is required!</div>
        </Flicker>
      </div>

      <div className="flex py-4">
        <div className="w-1/2 flex items-center justify-end pr-4">
          <button
            className={
              value === "false"
                ? `${shared} ${selected}`
                : `${shared} ${unselected}`
            }
            onClick={() => toggleValue("false")}
          >
            No
          </button>
        </div>

        <div className="w-1/2 flex items-center justify-start pl-4">
          <button
            className={
              value === "true"
                ? `${shared} ${selected}`
                : `${shared} ${unselected}`
            }
            onClick={() => toggleValue("true")}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooleanInput;
