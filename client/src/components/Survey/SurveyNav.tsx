import React from "react";
import { useQuery } from "@apollo/react-hooks";
import DraggableStack from "../DraggableStack/DraggableStack";
import { CardEntryDirection } from "../DraggableStack/variants";
import { gql } from "apollo-boost";
import { useHistory } from "react-router";
import { getQuestion } from "./nextQuestion";
import SurveyInner from "./SurveyInner";

export const GET_SURVEY = gql`
  query GetSurvey($surveyId: ID!) {
    cardEntryDirection @client
    survey(id: $surveyId) {
      id
      name
      questions {
        id
        text
        minValues
        answers {
          id
          values
        }
      }
    }
  }
`;

const SurveyNav = ({ questionId, surveyId, isComplete, belowMinValues }) => {
  const history = useHistory();

  const { data, client } = useQuery(GET_SURVEY, {
    variables: { surveyId }
  });

  const cardSwiped = (navigateForward: boolean) => {
    if (navigateForward && belowMinValues) {
      client.writeData({
        data: {
          minValuesReminder: true
        }
      });
      return;
    }

    const cardEntryDirection: CardEntryDirection = navigateForward
      ? "fromRight"
      : "fromLeft";
    // this needs to happen before the history push state or the animation re-triggers with the old direction
    client.writeData({
      data: {
        cardEntryDirection
      }
    });

    const [prevQuestionId, nextQuestionId] = getQuestion(
      questionId,
      data.survey.questions
    );

    if (navigateForward && nextQuestionId) {
      history.push(`/survey/${surveyId}/question/${nextQuestionId}`);
    } else if (navigateForward) {
      history.push(`/survey/${surveyId}/complete`);
    } else if (prevQuestionId) {
      history.push(`/survey/${surveyId}/question/${prevQuestionId}`);
    } else {
      history.push(`/survey/${surveyId}`);
    }
  };

  // this needs to be unique or transitions get messed up
  const cardKey = questionId ? questionId : isComplete ? "complete" : "start";

  return (
    <>
      <DraggableStack
        val={cardKey}
        direction={data.cardEntryDirection}
        nextCard={() => cardSwiped(true)}
        previousCard={() => cardSwiped(false)}
      >
        <div className="w-full h-full border border-gray-300 rounded bg-white box-border shadow-md">
          <SurveyInner
            surveyId={surveyId}
            questionId={questionId}
            isComplete={isComplete}
          />
        </div>
      </DraggableStack>
    </>
  );
};

export default SurveyNav;
