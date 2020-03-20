import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GQLAnonUser = {
  __typename?: "AnonUser";
  id: Scalars["ID"];
  survey: GQLSurvey;
};

export type GQLAnswer = {
  __typename?: "Answer";
  id: Scalars["ID"];
  values: Array<Scalars["String"]>;
};

export enum GQLCardEntryDirection {
  FromRight = "fromRight",
  FromLeft = "fromLeft"
}

export type GQLCreateAnonUserResponse = {
  __typename?: "CreateAnonUserResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  anonUser: GQLAnonUser;
};

export type GQLCreateAnswerResponse = {
  __typename?: "CreateAnswerResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  answer: GQLAnswer;
};

export type GQLMutation = {
  __typename?: "Mutation";
  createAnonUser: GQLCreateAnonUserResponse;
  createAnswer: GQLCreateAnswerResponse;
};

export type GQLMutationCreateAnonUserArgs = {
  surveyId: Scalars["ID"];
};

export type GQLMutationCreateAnswerArgs = {
  anonUserId: Scalars["ID"];
  questionId: Scalars["ID"];
  values?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type GQLPossibleValue = {
  __typename?: "PossibleValue";
  id: Scalars["ID"];
  value: Scalars["String"];
  label: Scalars["String"];
};

export type GQLQuery = {
  __typename?: "Query";
  anonUser: GQLAnonUser;
  anonUserId: Scalars["String"];
  cardEntryDirection: GQLCardEntryDirection;
  minValuesReminder: Scalars["Boolean"];
  question: GQLQuestion;
  survey: GQLSurvey;
};

export type GQLQueryAnonUserArgs = {
  id: Scalars["ID"];
};

export type GQLQueryQuestionArgs = {
  id: Scalars["ID"];
  anonUserId?: Maybe<Scalars["ID"]>;
};

export type GQLQuerySurveyArgs = {
  id: Scalars["ID"];
};

export type GQLQuestion = {
  __typename?: "Question";
  id: Scalars["ID"];
  text: Scalars["String"];
  answer?: Maybe<GQLAnswer>;
  possibleValues?: Maybe<Array<GQLPossibleValue>>;
  maxValues?: Maybe<Scalars["Int"]>;
  minValues?: Maybe<Scalars["Int"]>;
  answerType?: Maybe<Scalars["String"]>;
};

export type GQLSurvey = {
  __typename?: "Survey";
  id: Scalars["ID"];
  name: Scalars["String"];
  questions: Array<GQLQuestion>;
};

export type GQLQuestionQueryQueryVariables = {
  questionId: Scalars["ID"];
};

export type GQLQuestionQueryQuery = { __typename?: "Query" } & Pick<
  GQLQuery,
  "anonUserId" | "minValuesReminder"
> & {
    question: { __typename?: "Question" } & Pick<
      GQLQuestion,
      "id" | "text" | "minValues" | "maxValues"
    > & {
        answer?: Maybe<
          { __typename?: "Answer" } & Pick<GQLAnswer, "id" | "values">
        >;
        possibleValues?: Maybe<
          Array<
            { __typename?: "PossibleValue" } & Pick<
              GQLPossibleValue,
              "id" | "label" | "value"
            >
          >
        >;
      };
  };

export type GQLQuestionMutationMutationVariables = {
  anonUserId: Scalars["ID"];
  questionId: Scalars["ID"];
  values?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type GQLQuestionMutationMutation = { __typename?: "Mutation" } & {
  createAnswer: { __typename: "CreateAnswerResponse" } & Pick<
    GQLCreateAnswerResponse,
    "success" | "message"
  > & { answer: { __typename: "Answer" } & Pick<GQLAnswer, "id" | "values"> };
};

export type GQLStartSurveyMutationMutationVariables = {
  surveyId: Scalars["ID"];
};

export type GQLStartSurveyMutationMutation = { __typename?: "Mutation" } & {
  createAnonUser: { __typename?: "CreateAnonUserResponse" } & {
    anonUser: { __typename?: "AnonUser" } & Pick<GQLAnonUser, "id">;
  };
};

export type GQLStartSurveyQueryQueryVariables = {};

export type GQLStartSurveyQueryQuery = { __typename?: "Query" } & Pick<
  GQLQuery,
  "anonUserId"
>;

export type GQLSurveyAuthQueryQueryVariables = {
  surveyId: Scalars["ID"];
};

export type GQLSurveyAuthQueryQuery = { __typename?: "Query" } & Pick<
  GQLQuery,
  "anonUserId"
> & {
    survey: { __typename?: "Survey" } & Pick<GQLSurvey, "id" | "name"> & {
        questions: Array<
          { __typename?: "Question" } & Pick<
            GQLQuestion,
            "id" | "text" | "minValues" | "maxValues"
          > & {
              answer?: Maybe<
                { __typename?: "Answer" } & Pick<GQLAnswer, "id" | "values">
              >;
              possibleValues?: Maybe<
                Array<
                  { __typename?: "PossibleValue" } & Pick<
                    GQLPossibleValue,
                    "id" | "label" | "value"
                  >
                >
              >;
            }
        >;
      };
  };

export type GQLSurveyNavigationQueryQueryVariables = {
  surveyId: Scalars["ID"];
};

export type GQLSurveyNavigationQueryQuery = { __typename?: "Query" } & Pick<
  GQLQuery,
  "cardEntryDirection"
> & {
    survey: { __typename?: "Survey" } & Pick<GQLSurvey, "id" | "name"> & {
        questions: Array<
          { __typename?: "Question" } & Pick<
            GQLQuestion,
            "id" | "text" | "minValues"
          > & {
              answer?: Maybe<
                { __typename?: "Answer" } & Pick<GQLAnswer, "id" | "values">
              >;
            }
        >;
      };
  };

export const QuestionQueryDocument = gql`
  query QuestionQuery($questionId: ID!) {
    anonUserId @client
    minValuesReminder @client
    question(id: $questionId) {
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
`;

/**
 * __useQuestionQueryQuery__
 *
 * To run a query within a React component, call `useQuestionQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionQueryQuery({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useQuestionQueryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLQuestionQueryQuery,
    GQLQuestionQueryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GQLQuestionQueryQuery,
    GQLQuestionQueryQueryVariables
  >(QuestionQueryDocument, baseOptions);
}
export function useQuestionQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLQuestionQueryQuery,
    GQLQuestionQueryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GQLQuestionQueryQuery,
    GQLQuestionQueryQueryVariables
  >(QuestionQueryDocument, baseOptions);
}
export type QuestionQueryQueryHookResult = ReturnType<
  typeof useQuestionQueryQuery
>;
export type QuestionQueryLazyQueryHookResult = ReturnType<
  typeof useQuestionQueryLazyQuery
>;
export type QuestionQueryQueryResult = ApolloReactCommon.QueryResult<
  GQLQuestionQueryQuery,
  GQLQuestionQueryQueryVariables
>;
export const QuestionMutationDocument = gql`
  mutation QuestionMutation(
    $anonUserId: ID!
    $questionId: ID!
    $values: [String]
  ) {
    createAnswer(
      anonUserId: $anonUserId
      questionId: $questionId
      values: $values
    ) {
      __typename
      success
      message
      answer {
        id
        values
        __typename
      }
    }
  }
`;
export type GQLQuestionMutationMutationFn = ApolloReactCommon.MutationFunction<
  GQLQuestionMutationMutation,
  GQLQuestionMutationMutationVariables
>;

/**
 * __useQuestionMutationMutation__
 *
 * To run a mutation, you first call `useQuestionMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuestionMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [questionMutationMutation, { data, loading, error }] = useQuestionMutationMutation({
 *   variables: {
 *      anonUserId: // value for 'anonUserId'
 *      questionId: // value for 'questionId'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useQuestionMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GQLQuestionMutationMutation,
    GQLQuestionMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    GQLQuestionMutationMutation,
    GQLQuestionMutationMutationVariables
  >(QuestionMutationDocument, baseOptions);
}
export type QuestionMutationMutationHookResult = ReturnType<
  typeof useQuestionMutationMutation
>;
export type QuestionMutationMutationResult = ApolloReactCommon.MutationResult<
  GQLQuestionMutationMutation
>;
export type QuestionMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GQLQuestionMutationMutation,
  GQLQuestionMutationMutationVariables
>;
export const StartSurveyMutationDocument = gql`
  mutation StartSurveyMutation($surveyId: ID!) {
    createAnonUser(surveyId: $surveyId) {
      anonUser {
        id
      }
    }
  }
`;
export type GQLStartSurveyMutationMutationFn = ApolloReactCommon.MutationFunction<
  GQLStartSurveyMutationMutation,
  GQLStartSurveyMutationMutationVariables
>;

/**
 * __useStartSurveyMutationMutation__
 *
 * To run a mutation, you first call `useStartSurveyMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartSurveyMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startSurveyMutationMutation, { data, loading, error }] = useStartSurveyMutationMutation({
 *   variables: {
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useStartSurveyMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GQLStartSurveyMutationMutation,
    GQLStartSurveyMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    GQLStartSurveyMutationMutation,
    GQLStartSurveyMutationMutationVariables
  >(StartSurveyMutationDocument, baseOptions);
}
export type StartSurveyMutationMutationHookResult = ReturnType<
  typeof useStartSurveyMutationMutation
>;
export type StartSurveyMutationMutationResult = ApolloReactCommon.MutationResult<
  GQLStartSurveyMutationMutation
>;
export type StartSurveyMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GQLStartSurveyMutationMutation,
  GQLStartSurveyMutationMutationVariables
>;
export const StartSurveyQueryDocument = gql`
  query StartSurveyQuery {
    anonUserId @client
  }
`;

/**
 * __useStartSurveyQueryQuery__
 *
 * To run a query within a React component, call `useStartSurveyQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStartSurveyQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStartSurveyQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useStartSurveyQueryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLStartSurveyQueryQuery,
    GQLStartSurveyQueryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GQLStartSurveyQueryQuery,
    GQLStartSurveyQueryQueryVariables
  >(StartSurveyQueryDocument, baseOptions);
}
export function useStartSurveyQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLStartSurveyQueryQuery,
    GQLStartSurveyQueryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GQLStartSurveyQueryQuery,
    GQLStartSurveyQueryQueryVariables
  >(StartSurveyQueryDocument, baseOptions);
}
export type StartSurveyQueryQueryHookResult = ReturnType<
  typeof useStartSurveyQueryQuery
>;
export type StartSurveyQueryLazyQueryHookResult = ReturnType<
  typeof useStartSurveyQueryLazyQuery
>;
export type StartSurveyQueryQueryResult = ApolloReactCommon.QueryResult<
  GQLStartSurveyQueryQuery,
  GQLStartSurveyQueryQueryVariables
>;
export const SurveyAuthQueryDocument = gql`
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

/**
 * __useSurveyAuthQueryQuery__
 *
 * To run a query within a React component, call `useSurveyAuthQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSurveyAuthQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSurveyAuthQueryQuery({
 *   variables: {
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useSurveyAuthQueryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLSurveyAuthQueryQuery,
    GQLSurveyAuthQueryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GQLSurveyAuthQueryQuery,
    GQLSurveyAuthQueryQueryVariables
  >(SurveyAuthQueryDocument, baseOptions);
}
export function useSurveyAuthQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLSurveyAuthQueryQuery,
    GQLSurveyAuthQueryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GQLSurveyAuthQueryQuery,
    GQLSurveyAuthQueryQueryVariables
  >(SurveyAuthQueryDocument, baseOptions);
}
export type SurveyAuthQueryQueryHookResult = ReturnType<
  typeof useSurveyAuthQueryQuery
>;
export type SurveyAuthQueryLazyQueryHookResult = ReturnType<
  typeof useSurveyAuthQueryLazyQuery
>;
export type SurveyAuthQueryQueryResult = ApolloReactCommon.QueryResult<
  GQLSurveyAuthQueryQuery,
  GQLSurveyAuthQueryQueryVariables
>;
export const SurveyNavigationQueryDocument = gql`
  query SurveyNavigationQuery($surveyId: ID!) {
    cardEntryDirection @client
    survey(id: $surveyId) {
      id
      name
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
`;

/**
 * __useSurveyNavigationQueryQuery__
 *
 * To run a query within a React component, call `useSurveyNavigationQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSurveyNavigationQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSurveyNavigationQueryQuery({
 *   variables: {
 *      surveyId: // value for 'surveyId'
 *   },
 * });
 */
export function useSurveyNavigationQueryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLSurveyNavigationQueryQuery,
    GQLSurveyNavigationQueryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GQLSurveyNavigationQueryQuery,
    GQLSurveyNavigationQueryQueryVariables
  >(SurveyNavigationQueryDocument, baseOptions);
}
export function useSurveyNavigationQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLSurveyNavigationQueryQuery,
    GQLSurveyNavigationQueryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GQLSurveyNavigationQueryQuery,
    GQLSurveyNavigationQueryQueryVariables
  >(SurveyNavigationQueryDocument, baseOptions);
}
export type SurveyNavigationQueryQueryHookResult = ReturnType<
  typeof useSurveyNavigationQueryQuery
>;
export type SurveyNavigationQueryLazyQueryHookResult = ReturnType<
  typeof useSurveyNavigationQueryLazyQuery
>;
export type SurveyNavigationQueryQueryResult = ApolloReactCommon.QueryResult<
  GQLSurveyNavigationQueryQuery,
  GQLSurveyNavigationQueryQueryVariables
>;

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: []
  }
};
export default result;
