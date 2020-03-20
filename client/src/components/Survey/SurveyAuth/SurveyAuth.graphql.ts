import { gql } from "apollo-boost";

export const GET_USER_ID = gql`
  query SurveyAuthQuery($surveyId: ID!) {
    anonUserId @client
    survey(id: $surveyId) {
      id
      name
      questions {
        id
        text
        minValues
        maxValues
        answer {
          id
          values
        }
        possibleValues {
          id
          label
          value
        }
      }
    }
  }
`;
