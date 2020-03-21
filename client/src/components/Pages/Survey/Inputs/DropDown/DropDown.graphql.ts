import { gql } from "apollo-boost";

const GET_CHOICE_QUESTION = gql`
  query DropDownQuery($questionId: ID!) {
    belowMinValues @client
    question(id: $questionId) {
      id
      minValues
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
