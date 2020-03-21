import { gql } from "apollo-boost";

export const GET_QUESTION = gql`
  query QuestionQuery($questionId: ID!) {
    anonUserId @client
    belowMinValues @client
    question(id: $questionId) {
      id
      text
      minValues
      answer {
        id
        values
      }
      inputType
      maxLength
      max
      min
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
