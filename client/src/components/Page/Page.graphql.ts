import { gql } from "apollo-boost";

export const GET_PAGE = gql`
  query PageQuery($pageId: ID!) {
    page(id: $pageId) {
      id
      order
      questions {
        id
        order
      }
    }
  }
`;
