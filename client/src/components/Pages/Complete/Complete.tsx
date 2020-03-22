import React, { useEffect } from "react";
import { useCompleteQueryQuery } from "../../../generated/graphql";
import { GET_USER_ID } from "../Survey/SurveyAuth/SurveyAuth.graphql";
import { RouteComponentProps } from "react-router";
import QuestionText from "../../Generic/QuestionText";

interface Props extends RouteComponentProps<{ surveyId: string }> {}

const Complete = (props: Props) => {
  const { surveyId } = props.match.params;
  const { data, client } = useCompleteQueryQuery();

  const completeSurvey = () => {
    client.writeData({
      data: {
        anonUserId: null // wipe user id so answers can no longer be edited
      }
    });

    const query = client.readQuery({
      query: GET_USER_ID,
      variables: { surveyId }
    });

    client.writeQuery({
      query: GET_USER_ID,
      variables: { surveyId },
      data: {
        ...query,
        survey: {
          ...query.survey,
          pages: query.survey.pages.map(page => ({
            ...page,
            questions: page.questions.map(question => ({
              ...question,
              answer: null // wipe all answers
            }))
          }))
        }
      }
    });
  };

  useEffect(() => {
    if (data!.anonUserId) {
      completeSurvey();
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <QuestionText>Thanks for taking part in the survey!</QuestionText>
    </div>
  );
};

export default Complete;
