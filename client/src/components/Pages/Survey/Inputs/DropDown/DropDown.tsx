import React, { ChangeEvent } from "react";
import { useDropDownQueryQuery } from "../../../../../generated/graphql";
import { sortResource } from "../../../../../pagination";

interface Props {
  questionId: string;
  onSave: (values: string[]) => void;
}

const DropDown = ({ questionId, onSave }: Props) => {
  const { data } = useDropDownQueryQuery({
    variables: { questionId }
  });

  const {
    question: { answer, possibleValues }
  } = data!;

  const selectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    onSave([event.target.value]);
  };

  const value = answer ? answer.values[0] : "";

  return (
    <div className={"py-4 relative"}>
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onChange={e => selectValue(e)}
        value={value}
      >
        <option value="">Select</option>
        {sortResource(possibleValues!).map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default DropDown;
