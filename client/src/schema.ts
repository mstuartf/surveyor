import { gql } from "apollo-boost";

export const typeDefs = gql`
  enum CardEntryDirection {
    fromRight
    fromLeft
  }

  type Query {
    anonUserId: String!
    cardEntryDirection: CardEntryDirection!
    belowMinValues: [String!]!
    question(id: ID!): Question!
    page(id: ID!): Page!
  }
`;
