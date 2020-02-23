const resolvers = {
  Query: {
    sessions: async (_, __, { dataSources }) => dataSources.sessions.get(),
    surveys: async (_, __, { dataSources }) => dataSources.surveys.get(),
    questions: async (_, { surveyId, userId }, { dataSources }) =>
      dataSources.questions.getForSurvey(surveyId, userId),
    answers: async (_, { sessionId, questionId }, { dataSources }) =>
      dataSources.answers.get(sessionId, questionId),
    info: async (_, { sessionId }, { dataSources }) => {
      const session = await dataSources.sessions.get(sessionId);
      const survey = await dataSources.surveys.get(session.dataValues.surveyId);
      const questions = await dataSources.questions.getForSurvey(
        survey.dataValues.id
      );
      let answers = await dataSources.answers.getForSession(sessionId);
      return {
        survey,
        session,
        questions: questions.map(question => ({
          ...question.dataValues,
          answers: answers
            .filter(
              answer => answer.dataValues.questionId === question.dataValues.id
            )
            .map(answer => ({
              ...answer.dataValues
            }))
        }))
      };
    }
  },
  Mutation: {
    createAnswer: async (
      _,
      { sessionId, questionId, value },
      { dataSources }
    ) => {
      const answer = await dataSources.answers.create(
        sessionId,
        questionId,
        value
      );
      return {
        success: true,
        message: `answer created'}`,
        answer
      };
    },
    updateAnswer: async (_, { answerId, value }, { dataSources }) => {
      const answer = await dataSources.answers.update(answerId, value);
      return {
        success: true,
        message: `answer updated'}`,
        answer
      };
    },
    createSession: async (_, {}, { dataSources }) => {
      const session = await dataSources.sessions.create();
      return {
        success: true,
        message: "session created",
        session
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
