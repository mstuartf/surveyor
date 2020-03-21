// Your GraphQL schema defines what types of data a client can read and write to your data graph.
// Schemas are strongly typed, which unlocks powerful developer tooling.

import { gql } from "apollo-server";

// The language we'll use to write the schema is GraphQL's schema definition language (SDL).
export const typeDefs = gql`
  enum InputType {
    TEXT
    EMAIL
    TEXTAREA
    RANGE
    NUMBER
    CHOICE
    DROPDOWN
    BOOLEAN
  }

  type Survey {
    id: ID!
    name: String!
    pages: [Page!]!
  }

  type Page {
    id: ID!
    order: Float!
    questions: [Question!]!
  }

  type Question {
    id: ID!
    order: Float!
    text: String!
    answer: Answer
    inputType: InputType!

    """
    used to set any field as required
    """
    minValues: Int

    """
    TEXT and TEXTAREA inputs
    """
    maxLength: Int

    """
    CHOICE and DROPDOWN
    """
    possibleValues: [PossibleValue!]

    """
    CHOICE
    """
    maxValues: Int

    """
    RANGE and NUMBER
    """
    max: Int
    min: Int
  }

  type Answer {
    id: ID!
    values: [String!]!
  }

  type PossibleValue {
    id: ID!
    order: Float!
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
    createSurvey(name: String!): Survey!
    createPage(surveyId: ID!, order: Float): Page!
    createQuestion(pageId: ID!, order: Float, text: String): Question!
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
