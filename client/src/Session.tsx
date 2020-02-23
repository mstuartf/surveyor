import React from "react";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

const CREATE_SESSION = gql`
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
    onCompleted: data => {
      const id = data.createSession.session.id;
      // localStorage.setItem("session", JSON.stringify({id}));
      client.writeData({ data: { sessionId: id } });
    }
  });

  return (
    <div>
      <button onClick={() => createSession()}>Create session</button>
    </div>
  );
};

export default Session;
