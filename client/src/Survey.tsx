import React from "react";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import CardStack from "./components/CardStack/CardStack";
import StartSurvey from "./StartSurvey";
import { gql } from "apollo-boost";
import { useHistory } from "react-router";
import Completed from "./Completed";

export const GET_SURVEY = gql`
  query GetSurvey($surveyId: ID!) {
    survey(id: $surveyId) {
      id
      name
      questions {
        id
        text
        answers {
          id
          values
        }
      }
    }
    cardEntryDirection @client
  }
`;

const Survey = ({ questionId, surveyId, isComplete }) => {
  const client = useApolloClient();
  const history = useHistory();

  const { data } = useQuery(GET_SURVEY, { variables: { surveyId } });

  if (!data) {
    return <div>Loading...</div>;
  }

  const { questions } = data.survey;
  const nextId = questions
    .map(q => q.id)
    .sort()
    .find(id => id > (questionId || 0));
  const prevId = questions
    .map(q => q.id)
    .sort()
    .reverse()
    .find(id => id < (questionId || 1000));

  const nextQuestion = (next: boolean) => {
    // this needs to happen before the history push state or the animation re-triggers with the old direction
    client.writeData({
      data: {
        cardEntryDirection: next ? 1 : -1
      }
    });

    // can't go forward if on the complete page
    if (!questionId && isComplete && next) {
      return;
    }
    // can't go back if on the start page
    if (!questionId && !isComplete && !next) {
      return;
    }

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
        <CardStack
          val={cardKey}
          direction={data.cardEntryDirection}
          nextCard={() => nextQuestion(true)}
          previousCard={() => nextQuestion(false)}
        >
          {questionId ? (
            <div className="w-full h-full border border-gray-300 rounded bg-white box-border shadow-md">
              Question: {questionId}
            </div>
          ) : !isComplete ? (
            <StartSurvey surveyId={surveyId} />
          ) : (
            <Completed />
          )}
        </CardStack>
      </div>
    </div>
  );
};

export default Survey;
