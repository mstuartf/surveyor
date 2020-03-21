import React, { useEffect } from "react";
import { useCompleteQueryQuery } from "../../../generated/graphql";

const Complete = () => {
  const { data, client } = useCompleteQueryQuery();
  console.log(data);

  const completeSurvey = () => {
    client.writeData({
      data: {
        anonUserId: null
      }
    });
  };

  useEffect(() => {
    if (data!.anonUserId) {
      completeSurvey();
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-100">
      Completed
    </div>
  );
};

export default Complete;
