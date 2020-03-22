import React, { useEffect } from "react";
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
  const reminder = belowMinValues.indexOf(questionId) > -1;

  const wipeMinValuesReminder = () => {
    setTimeout(() => {
      client.writeData({
        data: {
          belowMinValues: belowMinValues.filter(id => id !== questionId)
        }
      });
    }, delay);
  };

  useEffect(() => {
    if (reminder) {
      wipeMinValuesReminder();
    }
  }, [belowMinValues]);

  return React.cloneElement(children, {
    className: reminder ? reminderClass : ""
  });
};

export default Flicker;
