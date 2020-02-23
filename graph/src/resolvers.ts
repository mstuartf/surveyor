const resolvers = {
  Query: {
    surveys: async (_, __, { dataSources }) => dataSources.surveys.get(),
    questions: async (_, { surveyId, userId }, { dataSources }) =>
      dataSources.questions.getForSurvey(surveyId),
    answers: async (_, { sessionId, questionId }, { dataSources }) =>
      dataSources.answers.get(sessionId, questionId),
    session: async (_, { id }, { dataSources }) => {
      const session = await dataSources.sessions.get(id);
      const survey = await dataSources.surveys.get(session.dataValues.surveyId);
      const questions = await dataSources.questions.getForSurvey(
        survey.dataValues.id
      );
      const answers = await dataSources.answers.getForSession(id);
      return {
        id: session.dataValues.id,
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
    createSession: async (_, { surveyId }, { dataSources }) => {
      const survey = await dataSources.surveys.get(surveyId);
      const session = await dataSources.sessions.create(surveyId);
      const questions = await dataSources.questions.getForSurvey(surveyId);
      return {
        success: true,
        message: "session created",
        session: {
          id: session.dataValues.id,
          survey: {
            ...survey.dataValues
          },
          ...session.dataValues,
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
