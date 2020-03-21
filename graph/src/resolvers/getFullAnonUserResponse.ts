export async function getFullAnonUserResponse(dataSources, anonUser) {
  const survey = await dataSources.surveys.get(anonUser.dataValues.surveyId);
  const pages = await dataSources.pages.getForSurvey(survey.dataValues.id);
  const questions = await dataSources.questions.getForPages(
    pages.map(page => page.dataValues.id)
  );

  const answers = await dataSources.answers.getForAnonUser(anonUser.id);
  const values = await dataSources.possibleValues.get();

  return {
    id: anonUser.dataValues.id,
    survey: {
      ...survey.dataValues,
      pages: pages.map(page => ({
        ...page.dataValues,
        questions: questions.map(question => ({
          ...question.dataValues,
          answers: answers
            .filter(
              answer => answer.dataValues.questionId === question.dataValues.id
            )
            .map(answer => ({
              ...answer.dataValues,
              values: answer.values.split("|")
            })),
          possibleValues: values
            .filter(value => value.questionId === question.id)
            .map(possibleAnswer => ({
              id: possibleAnswer.id,
              value: possibleAnswer.value,
              label: possibleAnswer.label
            }))
        }))
      }))
    }
  };
}
