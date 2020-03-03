import { getFullAnonUserResponse } from "./getFullAnonUserResponse";

const resolvers = {
  Query: {
    anonUser: async (_, { id }, { dataSources }) => {
      const anonUser = await dataSources.anonUsers.get(id);
      return getFullAnonUserResponse(dataSources, anonUser);
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
