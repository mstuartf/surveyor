import React from "react";
import { usePageCounterQueryQuery } from "../../../../generated/graphql";

interface Props {
  surveyId: string;
  pageId: string;
}

const Progress = ({ surveyId, pageId }: Props) => {
  const { data } = usePageCounterQueryQuery({
    variables: { surveyId }
  });

  const {
    survey: { pages }
  } = data!;

  const sorted = [...pages].sort((a, b) => (a.order > b.order ? 1 : -1));
  const current = sorted.findIndex(q => q.id === pageId);

  return (
    <div className="text-md text-gray-500 font-light">
      {current + 1}/{sorted.length}
    </div>
  );
};

export default Progress;
