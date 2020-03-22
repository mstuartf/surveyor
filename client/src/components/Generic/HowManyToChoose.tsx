import React from "react";

interface Props {
  minValues?: number | null;
  maxValues?: number | null;
}

const HowManyToChoose = ({ minValues, maxValues }: Props) => {
  let instructions: string;
  if (minValues && maxValues && minValues === maxValues) {
    instructions = `Choose ${minValues} value${minValues > 1 ? "s" : ""}`;
  } else if (minValues && maxValues) {
    instructions = `Choose between ${minValues} and ${maxValues} values`;
  } else if (minValues) {
    instructions = `Choose ${minValues} value${minValues > 1 ? "s" : ""}`;
  } else {
    instructions = `Choose as many values as you like`;
  }

  return <>{instructions}</>;
};

export default HowManyToChoose;
