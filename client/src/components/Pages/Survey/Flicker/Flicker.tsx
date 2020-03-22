import React from "react";
import { useFlickerQueryQuery } from "../../../../generated/graphql";

interface Props {
  delay?: number;
  reminderClass: string;
  questionId: string;
  children: any;
}

const Flicker = ({
  delay = 1000,
  questionId,
  children,
  reminderClass
}: Props) => {
  const { data, client } = useFlickerQueryQuery();

  const { belowMinValues } = data!;

  const wipeMinValuesReminder = () => {
    setTimeout(() => {
      client.writeData({
        data: {
          belowMinValues: belowMinValues.filter(id => id !== questionId)
        }
      });
    }, delay);
  };

  if (belowMinValues) {
    wipeMinValuesReminder();
  }

  const reminder = belowMinValues.indexOf(questionId) > -1;

  return React.cloneElement(children, {
    className: reminder ? reminderClass : ""
  });
};

export default Flicker;
