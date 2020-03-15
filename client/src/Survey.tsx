import React from "react";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import CardStack from "./components/CardStack/CardStack";
import StartSurvey from "./StartSurvey";
import { gql } from "apollo-boost";
import { Redirect, useHistory } from "react-router";
import Completed from "./Completed";
import { HAS_ANON_USER } from "./HasStarted";

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
  }
`;

const Survey = ({ questionId, surveyId, isComplete }) => {
  const client = useApolloClient();
  const history = useHistory();

  const { data } = useQuery(GET_SURVEY, { variables: { surveyId } });
  const dir = useQuery(HAS_ANON_USER);

  let nextId, prevId;

  if (data) {
    const { questions } = data.survey;
    nextId = questions
      .map(q => q.id)
      .sort()
      .find(id => id > (questionId || 0));
    prevId = questions
      .map(q => q.id)
      .sort()
      .reverse()
      .find(id => id < (questionId || 1000));
  }

  const nextQuestion = (next: boolean) => {
    // this needs to happen before the history push state or the animation re-triggers with the old direction
    client.writeData({
      data: {
        direction: next ? 1 : -1
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
  const direction = dir.data ? dir.data.direction : 1; // default to easing in from the left

  return (
    <div className="border border-dashed border-gray-300 rounded overflow-hidden p-8 w-full max-w-lg h-full max-h-2xl m-auto mt-16">
      <div className="w-full h-full relative">
        <CardStack
          val={cardKey}
          direction={direction}
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
