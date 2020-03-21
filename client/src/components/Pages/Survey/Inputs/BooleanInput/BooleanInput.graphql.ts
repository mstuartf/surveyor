import { gql } from "apollo-boost";

const GET_INPUT_QUESTION = gql`
  query BooleanInputQuery($questionId: ID!) {
    belowMinValues @client
    question(id: $questionId) {
      id
      type
      minValues
      answer {
        id
        values
      }
      maxLength
    }
  }
`;
