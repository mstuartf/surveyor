import { gql } from "apollo-boost";

export const PAGE_COUNTER = gql`
  query PageCounterQuery($surveyId: ID!) {
    survey(id: $surveyId) {
      pages {
        id
        order
      }
    }
  }
`;
