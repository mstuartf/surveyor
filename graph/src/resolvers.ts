const resolvers = {
  Query: {
    surveys: async (_, __, { dataSources }) => dataSources.surveys.get(),
    questions: async (_, { surveyId, userId }, { dataSources }) =>
      dataSources.questions.getForSurvey(surveyId),
    answers: async (_, { anonUserId, questionId }, { dataSources }) =>
      dataSources.answers.get(anonUserId, questionId),
    anonUser: async (_, { id }, { dataSources }) => {
      const anonUser = await dataSources.anonUsers.get(id);
      const survey = await dataSources.surveys.get(
        anonUser.dataValues.surveyId
      );
      const questions = await dataSources.questions.getForSurvey(
        survey.dataValues.id
      );
      const answers = await dataSources.answers.getForAnonUser(id);
      const values = await dataSources.possibleValues.get();
      return {
        id: anonUser.dataValues.id,
        survey: {
          ...survey.dataValues
        },
        questions: questions.map(question => ({
          ...question.dataValues,
          answers: answers
            .filter(
              answer => answer.dataValues.questionId === question.dataValues.id
            )
            .map(answer => ({
              ...answer.dataValues
            })),
          possibleValues: values
            .filter(value => value.questionId === question.id)
            .map(possibleAnswer => ({
              id: possibleAnswer.id,
              value: possibleAnswer.value,
              label: possibleAnswer.label
            }))
        }))
      };
    }
  },
  Mutation: {
    createAnswer: async (
      _,
      { anonUserId, questionId, value },
      { dataSources }
    ) => {
      const answer = await dataSources.answers.create(
        anonUserId,
        questionId,
        value
      );
      return {
        success: true,
        message: `answer created`,
        answer
      };
    },
    updateAnswer: async (_, { answerId, value }, { dataSources }) => {
      const answer = await dataSources.answers.update(answerId, value);
      return {
        success: true,
        message: `answer updated`,
        answer
      };
    },
    createAnonUser: async (_, { surveyId }, { dataSources }) => {
      const survey = await dataSources.surveys.get(surveyId);
      const anonUser = await dataSources.anonUsers.create(surveyId);
      const questions = await dataSources.questions.getForSurvey(surveyId);
      return {
        success: true,
        message: "anonUser created",
        anonUser: {
          id: anonUser.dataValues.id,
          survey: {
            ...survey.dataValues
          },
          ...anonUser.dataValues,
          questions: questions.map(question => ({
            ...question.dataValues,
            answers: []
          }))
        }
      };
    },
    createSurvey: async (_, { name }, { dataSources }) => {
      const survey = await dataSources.surveys.create(name);

      if (!survey) {
        return {
          success: false,
          message: "failed to create survey - check name is unique"
        };
      }
      return {
        success: true,
        message: "survey created",
        survey
      };
    },
    createQuestion: async (_, { surveyId, text }, { dataSources }) => {
      const question = await dataSources.questions.create(surveyId, text);
      if (!question) {
        return {
          success: false,
          message: "failed to create question - check text is unique for survey"
        };
      }
      return {
        success: true,
        message: "question created",
        question
      };
    }
  }
};

export default resolvers;
