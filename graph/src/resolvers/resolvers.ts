import { getFullAnonUserResponse } from "./getFullAnonUserResponse";
import { ApolloError } from "apollo-server";

const resolvers = {
  Query: {
    anonUser: async (_, { id }, { dataSources }) => {
      const anonUser = await dataSources.anonUsers.get(id);
      return getFullAnonUserResponse(dataSources, anonUser);
    },
    survey: async (_, { id }, { dataSources }) => {
      const survey = await dataSources.surveys.get(id);

      if (!survey) {
        throw new ApolloError("No survey with this ID!");
      }

      const pages = await dataSources.pages.getForSurvey(survey.dataValues.id);
      const questions = await dataSources.questions.getForPages(
        pages.map(page => page.dataValues.id)
      );

      const values = await dataSources.possibleValues.get();

      return {
        ...survey.dataValues,
        pages: pages.map(page => ({
          ...page.dataValues,
          questions: questions
            .filter(
              question => question.dataValues.pageId === page.dataValues.id
            )
            .map(question => ({
              ...question.dataValues,
              answer: null,
              possibleValues: values
                .filter(value => value.questionId === question.id)
                .map(possibleAnswer => ({
                  id: possibleAnswer.id,
                  order: possibleAnswer.order,
                  value: possibleAnswer.value,
                  label: possibleAnswer.label
                }))
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
          values: answer.dataValues.values.length
            ? answer.dataValues.values.split("|")
            : []
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
