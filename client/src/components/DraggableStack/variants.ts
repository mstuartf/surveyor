export type CardEntryDirection = "fromRight" | "fromLeft";

export const variants = {
  enter: (direction: CardEntryDirection) => {
    return {
      x: direction === "fromLeft" ? -1000 : 1000,
      opacity: 0,
      rotate: direction === "fromLeft" ? -45 : 45
    };
  },
  center: {
    x: 0,
    opacity: 1,
    rotate: 0
  },
  exit: (direction: CardEntryDirection) => {
    return {
      x: direction === "fromLeft" ? 1000 : -1000,
      opacity: 0,
      rotate: direction === "fromLeft" ? 45 : -45
    };
  }
};
