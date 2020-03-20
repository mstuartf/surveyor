import { gql } from "apollo-boost";

export const typeDefs = gql`
  type Query {
    anonUserId: String!
    cardEntryDirection: String!
    minValuesReminder: Boolean!
  }
`;
