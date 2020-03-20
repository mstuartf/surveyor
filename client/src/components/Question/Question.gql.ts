import { gql } from "apollo-boost";

export const GET_QUESTION = gql`
  query QuestionQuery($questionId: ID!) {
    anonUserId @client
    minValuesReminder @client
    question(id: $questionId) {
      id
      text
      minValues
      maxValues
      answer {
        id
        values
      }
      possibleValues {
        id
        label
        value
      }
    }
  }
`;

export const CREATE_ANSWER = gql`
  mutation QuestionMutation(
    $anonUserId: ID!
    $questionId: ID!
    $values: [String]
  ) {
    createAnswer(
      anonUserId: $anonUserId
      questionId: $questionId
      values: $values
    ) {
      __typename
      success
      message
      answer {
        id
        values
        __typename
      }
    }
  }
`;