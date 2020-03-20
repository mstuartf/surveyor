import { CreateAnswerResponse, QuestionInterface } from "../../interfaces";
import { gql } from "apollo-boost";

export interface GetQuestionQuery {
  question: QuestionInterface;
  anonUserId: string;
  minValuesReminder: boolean;
}

export const GET_QUESTION = gql`
  query GetQuestion($questionId: ID!) {
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

export interface CreateAnswerMutation {
  createAnswer: CreateAnswerResponse;
}

export const CREATE_ANSWER = gql`
  mutation CreateAnswer($anonUserId: ID!, $questionId: ID!, $values: [String]) {
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
