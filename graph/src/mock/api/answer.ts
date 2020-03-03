import { DataSource } from "apollo-datasource";

export class AnswerAPI extends DataSource {
  private store;

  constructor({ store }) {
    super();
    this.store = store;
  }

  async getForAnonUser(anonUserId) {
    return await this.store.answers.findAll({ where: { anonUserId } });
  }

  async get(anonUserId, questionId) {
    return await this.store.answers.findAll({
      where: { anonUserId, questionId }
    });
  }

  async create(anonUserId, questionId, values) {
    return await this.store.answers.create({ anonUserId, questionId, values });
  }

  async update(anonUserId, questionId, value, answerId) {
    const existing = await this.store.answers.find({ where: { id: answerId } });
    return await existing.update({ value });
  }
}
