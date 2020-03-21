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

  // async create(surveyId, text) {
  //   const existing = await this.store.questions.find({
  //     where: { surveyId, text }
  //   });
  //
  //   if (existing) {
  //     return null;
  //   }
  //
  //   return await this.store.questions.create({ surveyId, text });
  // }
}
