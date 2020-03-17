import { getFullAnonUserResponse } from "./getFullAnonUserResponse";

const resolvers = {
  Query: {
    anonUser: async (_, { id }, { dataSources }) => {
      const anonUser = await dataSources.anonUsers.get(id);
      return getFullAnonUserResponse(dataSources, anonUser);
    },
    question: async (_, { id, anonUserId }, { dataSources }) => {
      const question = await dataSources.questions.get(id);
      const answers = await dataSources.answers.get(anonUserId, id);
      return {
        ...question.dataValues,
        answer: answers
          .map(answer => ({
            ...answer.dataValues,
            values: answer.dataValues.values.split("|")
          }))
          .sort()
          .reverse()
          .first()
      };
    },
    survey: async (_, { id }, { dataSources }) => {
      const survey = await dataSources.surveys.get(id);
      const questions = await dataSources.questions.getForSurvey(
        survey.dataValues.id
      );

      const values = await dataSources.possibleValues.get();

      return {
        ...survey.dataValues,
        questions: questions.map(question => ({
          ...question.dataValues,
          answer: null,
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
      { anonUserId, questionId, values },
      { dataSources }
    ) => {
      const answer = await dataSources.answers.create(
        anonUserId,
        questionId,
        values.join("|")
      );
      return {
        success: true,
        message: `answer created`,
        answer: {
          ...answer.dataValues,
          values: answer.dataValues.values.split("|")
        }
      };
    },
    createAnonUser: async (_, { surveyId }, { dataSources }) => {
      const anonUser = await dataSources.anonUsers.create(surveyId);
      return {
        success: true,
        message: "anonUser created",
        anonUser: getFullAnonUserResponse(dataSources, anonUser)
      };
    }
  }
};

export default resolvers;
