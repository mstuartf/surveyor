const sortProp: string = "id";

export const sortQuestions = (unsorted: { id: string }[]): { id: string }[] => {
  return [...unsorted].sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : -1));
};
