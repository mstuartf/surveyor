import { gql } from "apollo-boost";

export const HAS_ANON_USER = gql`
  query HasAnonUser {
    anonUserId @client
    direction @client
  }
`;
