import { DataSource } from "apollo-datasource";

export class PageAPI extends DataSource {
  private store;

  constructor({ store }) {
    super();
    this.store = store;
  }

  async getForSurvey(surveyId) {
    return await this.store.pages.findAll({ where: { surveyId } });
  }

  async create(surveyId, order) {
    const existing = await this.store.pages.find({
      where: { surveyId, order }
    });

    if (existing) {
      return null;
    }

    return await this.store.pages.create({ surveyId, order });
  }
}
