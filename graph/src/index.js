const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const { createStore } = require('./mock/database/utils');
const SurveyAPI = require('./mock/api/survey');
const SessionAPI = require('./mock/api/session');
const QuestionAPI = require('./mock/api/question');
const AnswerAPI = require('./mock/api/answer');

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    surveys: new SurveyAPI({ store }),
    sessions: new SessionAPI({ store }),
    questions: new QuestionAPI({ store }),
    answers: new AnswerAPI({ store }),
  })
});


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

