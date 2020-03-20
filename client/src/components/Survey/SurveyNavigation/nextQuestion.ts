import { sortQuestions } from "../../../sortQuestions";

export const getQuestion = (
  currentQuestionId: string,
  questions: { id: string }[]
): [string, string] => {
  questions = sortQuestions(questions);

  let index: number = questions.findIndex(
    question => question.id === currentQuestionId
  );

  if (!currentQuestionId) {
    // if on the START page
    index = -1;
  } else if (index < 0) {
    // if on the COMPLETE page
    index = questions.length;
  }

  const prev = questions[index - 1];
  const next = questions[index + 1];

  return [prev && prev.id, next && next.id];
};
