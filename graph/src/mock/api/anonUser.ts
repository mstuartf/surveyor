import { DataSource } from "apollo-datasource";

export class AnonUserAPI extends DataSource {
  private store;

  constructor({ store }) {
    super();
    this.store = store;
  }

  async get(id?) {
    if (id) {
      return await this.store.anonUsers.findOne({ where: { id } });
    }
    return await this.store.anonUsers.findAll();
  }

  async create(surveyId) {
    return await this.store.anonUsers.create({ surveyId });
  }
}
