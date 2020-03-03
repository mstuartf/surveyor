import React from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

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

const CreateAnonUser = ({ surveyId }) => {
  const client = useApolloClient();

  const [createAnonUser] = useMutation(CREATE_ANON_USER, {
    variables: { surveyId: surveyId },

    update(cache, { data: { createAnonUser } }) {
      client.writeData({
        data: {
          anonUser: createAnonUser.anonUser,
          anonUserId: createAnonUser.anonUser.id
        }
      });
    }
  });

  return (
    <div>
      <button onClick={() => createAnonUser()}>Start Survey</button>
    </div>
  );
};

export default CreateAnonUser;
