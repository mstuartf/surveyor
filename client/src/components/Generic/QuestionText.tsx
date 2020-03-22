import React from "react";

interface Props {
  children: string;
}

const QuestionText = ({ children }: Props) => {
  return <div className="text-xl text-purple-500 font-light">{children}</div>;
};

export default QuestionText;
