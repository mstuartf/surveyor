import { gql } from "apollo-boost";

export const GET_USER_ID = gql`
  query SurveyAuthQuery($surveyId: ID!) {
    anonUserId @client
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
          maxValues
          answer {
            id
            values
          }
          possibleValues {
            id
            order
            label
            value
          }
          type
          maxLength
          max
          min
        }
      }
    }
  }
`;
