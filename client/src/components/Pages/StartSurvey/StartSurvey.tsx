import React, { useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import {
  useStartSurveyMutationMutation,
  useStartSurveyQueryQuery
} from "../../../generated/graphql";
import QuestionText from "../../Generic/QuestionText";
import ReminderText from "../../Generic/ReminderText";

const StartSurvey = ({ surveyId }) => {
  const client = useApolloClient();

  const { data } = useStartSurveyQueryQuery({
    variables: { surveyId }
  });

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

  const { survey } = data!;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <QuestionText>{survey.name}</QuestionText>
      <div className="p-4">
        <ReminderText>Swipe to start!</ReminderText>
      </div>
    </div>
  );
};

export default StartSurvey;
