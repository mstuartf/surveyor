import React from "react";
import DraggableStack from "../../DraggableStack/DraggableStack";
import { CardEntryDirection } from "../../DraggableStack/variants";
import { useHistory } from "react-router";
import { getPage } from "./nextPage";
import SurveyContents from "../SurveyContents/SurveyContents";
import { useSurveyNavigationQueryQuery } from "../../../generated/graphql";
import Loading from "../../Loading/Loading";

interface Props {
  pageId: string;
  surveyId: string;
  isComplete: boolean;
  belowMinValues: string[];
}

const SurveyNavigation = ({
  pageId,
  surveyId,
  isComplete,
  belowMinValues
}: Props) => {
  const history = useHistory();

  const { data, client } = useSurveyNavigationQueryQuery({
    variables: { surveyId }
  });

  if (!data) {
    return <Loading />;
  }

  const cardSwiped = (navigateForward: boolean) => {
    if (navigateForward && belowMinValues.length) {
      client.writeData({
        data: {
          belowMinValues
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

    const [prevPageId, nextPageId] = getPage(pageId, data.survey.pages);

    if (navigateForward && nextPageId) {
      history.push(`/survey/${surveyId}/page/${nextPageId}`);
    } else if (navigateForward) {
      history.push(`/survey/${surveyId}/complete`);
    } else if (prevPageId) {
      history.push(`/survey/${surveyId}/page/${prevPageId}`);
    } else {
      history.push(`/survey/${surveyId}`);
    }
  };

  // this needs to be unique or transitions get messed up
  const cardKey = pageId ? pageId : isComplete ? "complete" : "start";

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
            pageId={pageId}
            isComplete={isComplete}
          />
        </div>
      </DraggableStack>
    </>
  );
};

export default SurveyNavigation;
