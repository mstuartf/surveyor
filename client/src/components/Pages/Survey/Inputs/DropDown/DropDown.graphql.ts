import { gql } from "apollo-boost";

const GET_CHOICE_QUESTION = gql`
  query DropDownQuery($questionId: ID!) {
    question(id: $questionId) {
      id
      answer {
        id
        values
      }
      possibleValues {
        id
        order
        label
        value
      }
    }
  }
`;
