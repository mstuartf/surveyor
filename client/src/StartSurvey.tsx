import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";

export const START_SURVEY = gql`
  mutation CreateAnonUser($surveyId: ID!) {
    createAnonUser(surveyId: $surveyId) {
      anonUser {
        id
      }
    }
  }
`;

export const GET_USER_ID = gql`
  query HasAnonUser {
    anonUserId @client
  }
`;

const StartSurvey = ({ surveyId }) => {
  const client = useApolloClient();

  const { data } = useQuery(GET_USER_ID);

  const [startSurvey] = useMutation(START_SURVEY, {
    variables: { surveyId: surveyId },

    update(cache, { data: { createAnonUser } }) {
      client.writeData({
        data: {
          anonUserId: createAnonUser.anonUser.id
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
    <div className="w-full h-full border border-gray-300 rounded bg-white box-border shadow-md flex items-center justify-center">
      Survey {surveyId} - swipe to start...
    </div>
  );
};

export default StartSurvey;
