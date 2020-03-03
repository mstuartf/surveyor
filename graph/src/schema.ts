// Your GraphQL schema defines what types of data a client can read and write to your data graph.
// Schemas are strongly typed, which unlocks powerful developer tooling.

import { gql } from "apollo-server";

// The language we'll use to write the schema is GraphQL's schema definition language (SDL).
export const typeDefs = gql`
  type Survey {
    id: ID!
    name: String!
  }

  type Question {
    id: ID!
    text: String
    answers: [Answer]
    possibleValues: [PossibleValue]
    maxValues: Int
    minValues: Int
    answerType: String
  }

  type Answer {
    id: ID!
    values: [String]
  }

  type PossibleValue {
    id: ID!
    value: String
    label: String
  }

  type AnonUser {
    id: ID!
    survey: Survey
    questions: [Question]
  }

  type Query {
    anonUser(id: ID!): AnonUser
    surveys: [Survey]
    questions(surveyId: ID!): [Question]
    answers(anonUserId: ID!, questionId: ID!): [Answer]
  }

  type Mutation {
    createAnonUser(surveyId: ID!): CreateAnonUserResponse
    createSurvey(name: String!): CreateSurveyResponse
    createQuestion(surveyId: ID!, text: String): CreateQuestionResponse
    createAnswer(
      anonUserId: ID!
      questionId: ID!
      value: String
    ): CreateOrUpdateAnswerResponse
    updateAnswer(answerId: ID!, value: String): CreateOrUpdateAnswerResponse
  }

  type CreateSurveyResponse {
    success: Boolean!
    message: String
    survey: Survey
  }

  type CreateQuestionResponse {
    success: Boolean!
    message: String
    question: Question
  }

  type CreateAnonUserResponse {
    success: Boolean!
    message: String
    anonUser: AnonUser
  }

  type CreateOrUpdateAnswerResponse {
    success: Boolean!
    message: String
    answer: Answer
  }
`;
