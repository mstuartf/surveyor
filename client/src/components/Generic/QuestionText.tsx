import React from "react";

interface Props {
  children: string;
}

const QuestionText = ({ children }: Props) => {
  return <span className="text-xl text-purple-500 font-light">{children}</span>;
};

export default QuestionText;
