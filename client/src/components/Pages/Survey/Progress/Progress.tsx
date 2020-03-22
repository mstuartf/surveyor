import React, { CSSProperties } from "react";
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

  // @ts-ignore
  const style: CSSProperties = {
    "grid-template-columns": `repeat(${pages.length}, minmax(0, 1fr))`
  };
  const shared = "border-b-2 pb-4";

  return (
    <div className="w-full flex flex-col justify-center items-center pb-6">
      <div className="text-md text-gray-500 font-light">
        {current + 1}/{sorted.length}
      </div>
      <div className="w-full grid gap-1" style={style}>
        {pages.map((page, index) => (
          <div
            className={
              index > current
                ? `${shared} border-gray-300`
                : `${shared} border-purple-500`
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Progress;
