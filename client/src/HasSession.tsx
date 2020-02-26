import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Survey from "./Survey";
import Session from "./Session";
import React from "react";

export const HAS_SESSION = gql`
  query HasSession {
    sessionId @client
  }
`;

const HasSession = () => {
  const { data } = useQuery(HAS_SESSION);
  return data && data.sessionId ? (
    <Survey sessionId={data.sessionId} />
  ) : (
    <Session />
  );
};

export default HasSession;
