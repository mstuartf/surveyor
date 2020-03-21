import { gql } from "apollo-boost";

export const GET_SURVEY = gql`
  query SurveyNavigationQuery($surveyId: ID!) {
    cardEntryDirection @client
    survey(id: $surveyId) {
      id
      name
      pages {
        id
        order
        questions {
          id
          order
          text
          minValues
          answer {
            id
            values
          }
        }
      }
    }
  }
`;
