import React from "react";
import { usePageQueryQuery } from "../../../../generated/graphql";
import Question from "../Question/Question";
import Progress from "../Progress/Progress";
import { sortResource } from "../../../../pagination";

interface Props {
  surveyId: string;
  pageId: string;
}

const Section = ({ pageId, surveyId }: Props) => {
  const { data } = usePageQueryQuery({
    variables: { pageId }
  });

  const {
    page: { questions }
  } = data!;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-grow items-center">
        <div className="w-full">
          {sortResource(questions).map(question => (
            <Question key={question.id} questionId={question.id} />
          ))}
        </div>
      </div>

      <Progress surveyId={surveyId} pageId={pageId} />
    </div>
  );
};

export default Section;
