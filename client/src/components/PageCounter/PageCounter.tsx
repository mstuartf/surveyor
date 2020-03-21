import React from "react";
import { usePageCounterQueryQuery } from "../../generated/graphql";
import Loading from "../Loading/Loading";

interface Props {
  surveyId: string;
  pageId: string;
}

const PageCounter = ({ surveyId, pageId }: Props) => {
  const { data } = usePageCounterQueryQuery({
    variables: { surveyId }
  });

  if (!data) {
    return <Loading />;
  }

  const sorted = [...data.survey.pages].sort((a, b) =>
    a.order > b.order ? 1 : -1
  );
  const current = sorted.findIndex(q => q.id === pageId);

  return (
    <div>
      {current + 1}/{sorted.length}
    </div>
  );
};

export default PageCounter;
