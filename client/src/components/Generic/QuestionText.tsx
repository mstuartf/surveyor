import React from "react";
import { brandColor } from "../../brand";

interface Props {
  children: string;
}

const QuestionText = ({ children }: Props) => {
  return (
    <span className={`text-xl text-${brandColor}-500 font-light`}>
      {children}
    </span>
  );
};

export default QuestionText;
