import { gql } from "apollo-boost";

export const START_SURVEY = gql`
  mutation StartSurveyMutation($surveyId: ID!) {
    createAnonUser(surveyId: $surveyId) {
      anonUser {
        id
      }
    }
  }
`;

export const GET_USER_ID = gql`
  query StartSurveyQuery {
    anonUserId @client
  }
`;
