import React from "react";
import Loading from "../Loading/Loading";
import { usePageQueryQuery } from "../../generated/graphql";
import Question from "../Question/Question";
import PageCounter from "../PageCounter/PageCounter";
import { sortResource } from "../../pagination";

interface Props {
  surveyId: string;
  pageId: string;
}

const Page = ({ pageId, surveyId }: Props) => {
  const { data } = usePageQueryQuery({
    variables: { pageId }
  });

  if (data === undefined) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {sortResource(data.page.questions).map(question => (
        <Question key={question.id} questionId={question.id} />
      ))}

      <div className="h-1/4 border w-full flex justify-center items-center">
        <PageCounter surveyId={surveyId} pageId={pageId} />
      </div>
    </div>
  );
};

export default Page;
