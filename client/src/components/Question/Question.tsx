import React from "react";

const Question = ({ questionId }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-red-100">
      Question: {questionId}
    </div>
  );
};

export default Question;
