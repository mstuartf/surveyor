const { DataSource } = require('apollo-datasource');

class AnswerAPI extends DataSource {

  constructor({ store }) {
    super();
    this.store = store;
  }

  async getForSession(sessionId) {
    return await this.store.answers.findAll({where: {sessionId}});
  }

  async get(sessionId, questionId) {
    return await this.store.answers.findAll({where: {sessionId, questionId}});
  }

  async create(sessionId, questionId, value) {
    return await this.store.answers.create({sessionId, questionId, value});
  }

  async update(sessionId, questionId, value, answerId) {
    const existing = await this.store.answers.find({where: {id: answerId}});
    return await existing.update({value})
  }

}

module.exports = AnswerAPI;
