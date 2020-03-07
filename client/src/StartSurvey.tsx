import React from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { HAS_ANON_USER } from "./HasStarted";
import Question from "./Question";

export const CREATE_ANON_USER = gql`
  mutation CreateAnonUser($surveyId: ID!) {
    createAnonUser(surveyId: $surveyId) {
      success
      message
      anonUser {
        id
        survey {
          id
          name
        }
        questions {
          id
          text
          answers {
            id
            values
          }
        }
      }
    }
  }
`;

const StartSurvey = props => {
  const client = useApolloClient();

  const { data } = useQuery(HAS_ANON_USER);

  const [startSurvey] = useMutation(CREATE_ANON_USER, {
    variables: { surveyId: props.match.params.surveyId },

    update(cache, { data: { createAnonUser } }) {
      client.writeData({
        data: {
          anonUser: createAnonUser.anonUser,
          anonUserId: createAnonUser.anonUser.id
        }
      });
    }
  });

  if (data && data.anonUserId) {
    return <Question anonUserId={data.anonUserId} questionId={null} />;
  }

  return (
    <div>
      <button onClick={() => startSurvey()}>Start Survey</button>
    </div>
  );
};

export default StartSurvey;
