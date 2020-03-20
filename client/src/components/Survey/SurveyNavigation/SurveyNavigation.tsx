import React from "react";
import DraggableStack from "../../DraggableStack/DraggableStack";
import { CardEntryDirection } from "../../DraggableStack/variants";
import { useHistory } from "react-router";
import { getQuestion } from "./nextQuestion";
import SurveyContents from "../SurveyContents/SurveyContents";
import { useSurveyNavigationQueryQuery } from "../../../generated/graphql";
import Loading from "../../Loading/Loading";

const SurveyNavigation = ({
  questionId,
  surveyId,
  isComplete,
  belowMinValues
}) => {
  const history = useHistory();

  const { data, client } = useSurveyNavigationQueryQuery({
    variables: { surveyId }
  });

  if (!data) {
    return <Loading />;
  }

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
        cardKey={cardKey}
        direction={data.cardEntryDirection}
        nextCard={() => cardSwiped(true)}
        previousCard={() => cardSwiped(false)}
      >
        <div className="w-full h-full border border-gray-300 rounded bg-white box-border shadow-md">
          <SurveyContents
            surveyId={surveyId}
            questionId={questionId}
            isComplete={isComplete}
          />
        </div>
      </DraggableStack>
    </>
  );
};

export default SurveyNavigation;
