import { GQLPage } from "./generated/graphql";

const sortProp: string = "id";

export const sortPages = (
  unsorted: Pick<GQLPage, "id">[]
): Pick<GQLPage, "id">[] => {
  return [...unsorted].sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : -1));
};
