// Your GraphQL schema defines what types of data a client can read and write to your data graph.
// Schemas are strongly typed, which unlocks powerful developer tooling.

const { gql } = require("apollo-server");

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
  }

  type Answer {
    id: ID!
    value: String
  }

  type Session {
    id: ID!
    survey: Survey
  }

  type Info {
    survey: Survey
    session: Session
    questions: [Question]
  }

  type Query {
    sessions: [Session]
    surveys: [Survey]
    questions(surveyId: ID!): [Question]
    answers(sessionId: ID!, questionId: ID!): [Answer]
    info(sessionId: ID!): Info
  }

  type Mutation {
    createSession(surveyId: ID!): CreateSessionResponse
    createSurvey(name: String!): CreateSurveyResponse
    createQuestion(surveyId: ID!, text: String): CreateQuestionResponse
    createAnswer(
      sessionId: ID!
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

  type CreateSessionResponse {
    success: Boolean!
    message: String
    session: Session
  }

  type CreateOrUpdateAnswerResponse {
    success: Boolean!
    message: String
    answer: Answer
  }
`;
