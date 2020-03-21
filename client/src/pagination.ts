import { GQLPage } from "./generated/graphql";

export const getPage = (
  currentQuestionId: string,
  pages: Pick<GQLPage, "id" | "order">[]
): [string, string] => {
  pages.sort((a, b) => (a.order > b.order ? 1 : -1));

  let index: number = pages.findIndex(
    question => question.id === currentQuestionId
  );

  if (!currentQuestionId) {
    // if on the START page
    index = -1;
  } else if (index < 0) {
    // if on the COMPLETE page
    index = pages.length;
  }

  const prev = pages[index - 1];
  const next = pages[index + 1];

  return [prev && prev.id, next && next.id];
};
