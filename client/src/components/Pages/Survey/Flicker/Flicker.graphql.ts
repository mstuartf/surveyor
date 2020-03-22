import { gql } from "apollo-boost";

export const GET_QUESTION = gql`
  query FlickerQuery {
    belowMinValues @client
  }
`;
