import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema";
import resolvers from "./resolvers/resolvers";

import { createStore } from "./mock/database/utils";
import { AnonUserAPI } from "./mock/api/anonUser";
import { QuestionAPI } from "./mock/api/question";
import { PageAPI } from "./mock/api/page";
import { AnswerAPI } from "./mock/api/answer";
import { SurveyAPI } from "./mock/api/survey";
import { PossibleValueAPI } from "./mock/api/possibleValues";

const store = createStore(true);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    surveys: new SurveyAPI({ store }),
    anonUsers: new AnonUserAPI({ store }),
    questions: new QuestionAPI({ store }),
    pages: new PageAPI({ store }),
    answers: new AnswerAPI({ store }),
    possibleValues: new PossibleValueAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
