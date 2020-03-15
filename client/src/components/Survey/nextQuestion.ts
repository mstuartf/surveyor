const sortProp: string = "id";

export const getQuestion = (
  currentQuestionId: number,
  questions: { id: number }[]
): [number, number] => {
  questions.sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : -1));

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
