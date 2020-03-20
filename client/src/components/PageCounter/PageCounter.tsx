import React from "react";
import { usePageCounterQueryQuery } from "../../generated/graphql";
import Loading from "../Loading/Loading";
import { sortQuestions } from "../../sortQuestions";

interface Props {
  surveyId: string;
  questionId: string;
}

const PageCounter = ({ surveyId, questionId }: Props) => {
  const { data } = usePageCounterQueryQuery({
    variables: { surveyId }
  });

  if (!data) {
    return <Loading />;
  }

  const sorted = sortQuestions(data.survey.questions);
  const current = sorted.findIndex(q => q.id === questionId);

  return (
    <div>
      {current + 1}/{sorted.length}
    </div>
  );
};

export default PageCounter;
