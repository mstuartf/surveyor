import React from "react";

interface Props {
  children: any;
}

const ValidationText = ({ children }: Props) => {
  return (
    <div className="text-red-500 italic text-sm font-hairline">{children}</div>
  );
};

export default ValidationText;
