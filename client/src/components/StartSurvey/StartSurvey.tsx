import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import { useApolloClient } from "@apollo/react-hooks";
import {
  useStartSurveyMutationMutation,
  useStartSurveyQueryQuery
} from "../../generated/graphql";

export const START_SURVEY = gql`
  mutation StartSurveyMutation($surveyId: ID!) {
    createAnonUser(surveyId: $surveyId) {
      anonUser {
        id
      }
    }
  }
`;

export const GET_USER_ID = gql`
  query StartSurveyQuery {
    anonUserId @client
  }
`;

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
