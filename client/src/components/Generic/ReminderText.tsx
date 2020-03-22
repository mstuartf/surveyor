import React from "react";

interface Props {
  children: string;
}

const ReminderText = ({ children }: Props) => {
  return (
    <div className="text-purple-500 text-sm font-hairline">{children}</div>
  );
};

export default ReminderText;
