// Your GraphQL schema defines what types of data a client can read and write to your data graph.
// Schemas are strongly typed, which unlocks powerful developer tooling.

import { gql } from "apollo-server";

// The language we'll use to write the schema is GraphQL's schema definition language (SDL).
export const typeDefs = gql`
  enum InputType {
    RANGE
    NUMBER
    TEXT
    EMAIL
    TEXTAREA
    CHOICE
    DROPDOWN
  }

  type Survey {
    id: ID!
    name: String!
    questions: [Question!]!
  }

  type Question {
    id: ID!
    text: String!
    answer: Answer
    maxValues: Int
    minValues: Int
    answerType: String
    maxLength: Int
    possibleValues: [PossibleValue!]!
  }

  type Answer {
    id: ID!
    values: [String!]!
  }

  type PossibleValue {
    id: ID!
    value: String!
    label: String!
  }

  type AnonUser {
    id: ID!
    survey: Survey!
  }

  type Query {
    anonUser(id: ID!): AnonUser!
    survey(id: ID!): Survey!
  }

  type Mutation {
    createAnonUser(surveyId: ID!): CreateAnonUserResponse!
    createAnswer(
      anonUserId: ID!
      questionId: ID!
      values: [String]
    ): CreateAnswerResponse!
  }

  type CreateAnonUserResponse {
    success: Boolean!
    message: String!
    anonUser: AnonUser!
  }

  type CreateAnswerResponse {
    success: Boolean!
    message: String!
    answer: Answer!
  }
`;
