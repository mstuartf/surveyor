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
