import React from "react";
import { useInputQueryQuery } from "../../generated/graphql";
import { DebouncedInput } from "../DebouncedInput/DebouncedInput";
import Loading from "../Loading/Loading";

interface Props {
  questionId: string;
  onSave: Function;
}

const SingleInput = ({ questionId, onSave }: Props) => {
  const { data } = useInputQueryQuery({
    variables: { questionId }
  });

  if (!data) {
    return <Loading />;
  }

  const {
    question,
    question: { answer, minValues },
    belowMinValues
  } = data;
  const value = answer ? answer.values[0] : "";

  return (
    <>
      <div className="mt-2">Input answer</div>
      <DebouncedInput
        initialValue={value}
        type={question.type.toLowerCase()}
        callback={v => onSave([v])}
      />
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

export default SingleInput;
