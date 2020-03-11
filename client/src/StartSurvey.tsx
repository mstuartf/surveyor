import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { HAS_ANON_USER } from "./HasStarted";

export const CREATE_ANON_USER = gql`
  mutation CreateAnonUser($surveyId: ID!) {
    createAnonUser(surveyId: $surveyId) {
      success
      message
      anonUser {
        id
      }
    }
  }
`;

const StartSurvey = ({ surveyId }) => {
  const client = useApolloClient();

  const { data } = useQuery(HAS_ANON_USER);

  const [startSurvey] = useMutation(CREATE_ANON_USER, {
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
    <div className="w-full h-full border border-gray-300 rounded bg-white box-border shadow-md">
      Survey {surveyId} - swipe to start...
    </div>
  );
};

export default StartSurvey;
