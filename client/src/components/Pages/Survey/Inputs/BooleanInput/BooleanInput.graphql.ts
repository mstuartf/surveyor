import { gql } from "apollo-boost";

const GET_INPUT_QUESTION = gql`
  query BooleanInputQuery($questionId: ID!) {
    question(id: $questionId) {
      id
      type
      answer {
        id
        values
      }
      maxLength
    }
  }
`;
