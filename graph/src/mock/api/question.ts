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

  async getForSurvey(surveyId) {
    return await this.store.questions.findAll({ where: { surveyId } });
  }

  async create(surveyId, text) {
    const existing = await this.store.questions.find({
      where: { surveyId, text }
    });

    if (existing) {
      return null;
    }

    return await this.store.questions.create({ surveyId, text });
  }
}
