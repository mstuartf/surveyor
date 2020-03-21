import { GQLPage } from "./generated/graphql";

export const getPage = (
  currentQuestionId: string,
  pages: Pick<GQLPage, "id" | "order">[]
): [string, string] => {
  pages = sortResource(pages);

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

export const sortResource = <T extends { order: number; id: string }>(
  list: T[]
): T[] => {
  return [...list].sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
      return -1;
    } else {
      // if they have the same order default to id
      // need this to prevent elements jumping round the page
      return a.id > b.id ? 1 : -1;
    }
  });
};
