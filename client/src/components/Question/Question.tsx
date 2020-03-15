import React from "react";

const Question = ({ questionId }) => {
  return (
    <div className="w-full h-full border border-gray-300 rounded bg-white box-border shadow-md">
      Question: {questionId}
    </div>
  );
};

export default Question;
