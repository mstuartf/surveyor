import React from "react";
import { Link } from "react-router-dom";
import QuestionText from "../../Generic/QuestionText";
import { brandColor } from "../../../brand";

interface Props {
  surveyId: string;
}

const Submit = ({ surveyId }: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <QuestionText>You've finished!</QuestionText>
      <div className="py-8">
        <Link to={`/survey/${surveyId}/complete`}>
          <button
            className={`focus:outline-none rounded-lg font-light px-8 py-4 text-white bg-${brandColor}-500 border border-${brandColor}-500`}
          >
            Save results
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Submit;
