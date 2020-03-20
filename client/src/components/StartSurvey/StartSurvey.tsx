import React, { useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import {
  useStartSurveyMutationMutation,
  useStartSurveyQueryQuery
} from "../../generated/graphql";

const StartSurvey = ({ surveyId }) => {
  const client = useApolloClient();

  const { data } = useStartSurveyQueryQuery();

  const [startSurvey] = useStartSurveyMutationMutation({
    variables: { surveyId: surveyId },

    update(cache, { data }) {
      if (!data) {
        return;
      }

      client.writeData({
        data: {
          anonUserId: data.createAnonUser.anonUser.id
        }
      });
    }
  });

  // use useEffect because we are affecting the render
  // similar to on component did mount lifecycle method
  useEffect(() => {
    if (!data || !data.anonUserId) {
      startSurvey();
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-yellow-100 overflow-y-auto">
      Survey {surveyId} - swipe to start...
    </div>
  );
};

export default StartSurvey;
