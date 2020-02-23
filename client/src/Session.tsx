import React from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { GET_SESSION } from "./Survey";

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
        data: { sessionId: createSession.session.id }
      });

      cache.writeQuery({
        query: GET_SESSION,
        data: { session: createSession.session }
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
