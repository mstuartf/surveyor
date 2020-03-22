import React from "react";
import DraggableStack from "../../../Generic/DraggableStack/DraggableStack";
import { CardEntryDirection } from "../../../Generic/DraggableStack/variants";
import { useHistory } from "react-router";
import { getPage } from "../../../../pagination";
import SurveyContents from "../SurveyContents/SurveyContents";
import { useSurveyNavigationQueryQuery } from "../../../../generated/graphql";
import Loading from "../../../Generic/Loading/Loading";

interface Props {
  pageId: string;
  surveyId: string;
  submit: boolean;
  belowMinValues: string[];
}

const SurveyNavigation = ({
  pageId,
  surveyId,
  submit,
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
      history.push(`/survey/${surveyId}/submit`);
    } else if (prevPageId) {
      history.push(`/survey/${surveyId}/page/${prevPageId}`);
    } else {
      history.push(`/survey/${surveyId}`);
    }
  };

  // this needs to be unique or transitions get messed up
  const cardKey = pageId ? pageId : submit ? "submit" : "start";

  return (
    <>
      <DraggableStack
        cardKey={cardKey}
        direction={data.cardEntryDirection}
        nextCard={() => cardSwiped(true)}
        previousCard={() => cardSwiped(false)}
      >
        <div className="w-full h-full p-8">
          <div className="w-full h-full rounded-lg bg-white box-border shadow-2xl p-4">
            <SurveyContents
              surveyId={surveyId}
              pageId={pageId}
              submit={submit}
            />
          </div>
        </div>
      </DraggableStack>
    </>
  );
};

export default SurveyNavigation;
