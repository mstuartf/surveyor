import React from "react";
import { Link } from "react-router-dom";

interface Props {
  surveyId: string;
}

const Submit = ({ surveyId }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-100">
      Submit
      <Link to={`/survey/${surveyId}/complete`}>Save</Link>
    </div>
  );
};

export default Submit;
