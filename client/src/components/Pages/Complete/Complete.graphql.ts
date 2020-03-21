import { gql } from "apollo-boost";

export const GET_COMPLETE = gql`
  query CompleteQuery {
    anonUserId @client
  }
`;
