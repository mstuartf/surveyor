import { gql } from "apollo-boost";

export const typeDefs = gql`
  type Response {
    session: ID!
    survey: ID!
  }

  extend type Query {
    responses: [Response]
  }
`;

export const resolvers = {};
