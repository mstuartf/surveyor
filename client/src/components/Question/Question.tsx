import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const GET_QUESTION = gql`
  query GetQuestion($questionId: ID!) {
    question(id: $questionId) {
      id
      text
    }
  }
`;

const Question = ({ questionId }) => {
  // this should be fetched from the cache so no need to handle loading state
  const { data } = useQuery(GET_QUESTION, { variables: { questionId } });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-red-100">
      <div>Question: {questionId}</div>
      <div>{data.question.text}</div>
    </div>
  );
};

export default Question;
