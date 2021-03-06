import { gql } from "apollo-boost";

const GET_CHOICE_QUESTION = gql`
  query MultipleChoiceQuery($questionId: ID!) {
    question(id: $questionId) {
      id
      maxValues
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
