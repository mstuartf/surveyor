import React from "react";
import { usePageCounterQueryQuery } from "../../generated/graphql";
import Loading from "../Loading/Loading";
import { sortPages } from "../../sortPages";

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

  const sorted = sortPages(data.survey.pages);
  const current = sorted.findIndex(q => q.id === pageId);

  return (
    <div>
      {current + 1}/{sorted.length}
    </div>
  );
};

export default PageCounter;
