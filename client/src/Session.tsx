import React from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

export const CREATE_SESSION = gql`
  mutation CreateSession($surveyId: ID!) {
    createSession(surveyId: $surveyId) {
      success
      message
      session {
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
            value
          }
        }
      }
    }
  }
`;

const Session = () => {
  const client = useApolloClient();

  const [createSession] = useMutation(CREATE_SESSION, {
    variables: { surveyId: 2 },

    update(cache, { data: { createSession } }) {
      client.writeData({
        data: {
          session: createSession.session,
          sessionId: createSession.session.id
        }
      });

      localStorage.setItem(
        "session",
        JSON.stringify({ id: createSession.session.id })
      );
    }
  });

  return (
    <div>
      <button onClick={() => createSession()}>Create session</button>
    </div>
  );
};

export default Session;
