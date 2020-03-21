import { gql } from "apollo-boost";

export const GET_SURVEY = gql`
  query SurveyNavigationQuery($surveyId: ID!) {
    cardEntryDirection @client
    survey(id: $surveyId) {
      id
      name
      pages {
        id
        questions {
          id
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
