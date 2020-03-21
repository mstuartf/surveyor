import { gql } from "apollo-boost";

export const typeDefs = gql`
  enum CardEntryDirection {
    fromRight
    fromLeft
  }

  type Query {
    anonUserId: String!
    cardEntryDirection: CardEntryDirection!
    minValuesReminder: Boolean!
    question(id: ID!, anonUserId: ID): Question!
  }
`;
