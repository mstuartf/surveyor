import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema";
import resolvers from "./resolvers";

import { createStore } from "./mock/database/utils";
import { SessionAPI } from "./mock/api/session";
import { QuestionAPI } from "./mock/api/question";
import { AnswerAPI } from "./mock/api/answer";
import { SurveyAPI } from "./mock/api/survey";

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    surveys: new SurveyAPI({ store }),
    sessions: new SessionAPI({ store }),
    questions: new QuestionAPI({ store }),
    answers: new AnswerAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}