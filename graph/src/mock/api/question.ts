import { DataSource } from "apollo-datasource";

export class QuestionAPI extends DataSource {
  private store;

  constructor({ store }) {
    super();
    this.store = store;
  }

  async get(id?) {
    if (id) {
      return await this.store.questions.findOne({ where: { id } });
    }
    return await this.store.questions.findAll();
  }

  async getForPages(pageIds) {
    return await this.store.questions.findAll({ where: { pageId: pageIds } });
  }

  async create(pageId, order, text, instructions, config) {
    const existing = await this.store.questions.find({
      where: { pageId, order, text }
    });

    if (existing) {
      return null;
    }

    return await this.store.questions.create({
      pageId,
      order,
      text,
      instructions,
      ...config
    });
  }
}
