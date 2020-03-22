import React from "react";
import { brandColor } from "../../brand";

interface Props {
  children: any;
}

const ReminderText = ({ children }: Props) => {
  return (
    <div className={`text-${brandColor}-500 text-sm font-hairline`}>
      {children}
    </div>
  );
};

export default ReminderText;
