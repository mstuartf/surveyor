import React from "react";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import CardStack from "../CardStack/CardStack";
import { gql } from "apollo-boost";
import { useHistory } from "react-router";
import { CardEntryDirection } from "../CardStack/variants";
import { getQuestion } from "./nextQuestion";
import SurveyContents from "./SurveyContents";
import Loading from "../Loading/Loading";

export const GET_SURVEY = gql`
  query GetSurvey($surveyId: ID!) {
    cardEntryDirection @client
    survey(id: $surveyId) {
      id
      name
      questions {
        id
        text
      }
    }
  }
`;

const Survey = ({ questionId, surveyId, isComplete }) => {
  const client = useApolloClient();
  const history = useHistory();

  const { data } = useQuery(GET_SURVEY, { variables: { surveyId } });

  const nextQuestion = (next: boolean) => {
    const cardEntryDirection: CardEntryDirection = next
      ? "fromRight"
      : "fromLeft";
    // this needs to happen before the history push state or the animation re-triggers with the old direction
    client.writeData({
      data: {
        cardEntryDirection
      }
    });

    const [prevId, nextId] = getQuestion(questionId, data.survey.questions);

    if (next && nextId) {
      history.push(`/survey/${surveyId}/question/${nextId}`);
    } else if (next) {
      history.push(`/survey/${surveyId}/complete`);
    } else if (prevId) {
      history.push(`/survey/${surveyId}/question/${prevId}`);
    } else {
      history.push(`/survey/${surveyId}`);
    }
  };

  // this needs to be unique or transitions get messed up
  const cardKey = questionId ? questionId : isComplete ? "complete" : "start";

  return (
    <div className="border border-dashed border-gray-300 rounded overflow-hidden p-8 w-full max-w-lg h-full max-h-2xl m-auto mt-16">
      <div className="w-full h-full relative">
        {!data ? (
          <Loading />
        ) : (
          <CardStack
            val={cardKey}
            direction={data.cardEntryDirection}
            nextCard={() => nextQuestion(true)}
            previousCard={() => nextQuestion(false)}
          >
            <SurveyContents
              surveyId={surveyId}
              questionId={questionId}
              isComplete={isComplete}
            />
          </CardStack>
        )}
      </div>
    </div>
  );
};

export default Survey;
