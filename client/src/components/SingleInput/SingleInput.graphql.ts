import { gql } from "apollo-boost";

const GET_INPUT_QUESTION = gql`
  query InputQuery($questionId: ID!) {
    belowMinValues @client
    question(id: $questionId) {
      id
      minValues
      answer {
        id
        values
      }
      maxLength
    }
  }
`;
