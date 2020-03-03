import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Survey from "./Survey";
import CreateAnonUser from "./CreateAnonUser";
import React from "react";

export const HAS_ANON_USER = gql`
  query HasAnonUser {
    anonUserId @client
  }
`;

/*
  this component should check that the user has an anonUser for the survey
  if not, they should be redirected to create an anonUser
*/
const CheckAnonUserCreated = props => {
  const { data } = useQuery(HAS_ANON_USER);
  return data && data.anonUserId ? (
    <Survey anonUserId={data.anonUserId} />
  ) : (
    <CreateAnonUser surveyId={props.match.params.surveyId} />
  );
};

export default CheckAnonUserCreated;
