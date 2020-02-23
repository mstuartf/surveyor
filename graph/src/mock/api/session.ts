import { DataSource } from "apollo-datasource";

export class SessionAPI extends DataSource {
  private store;

  constructor({ store }) {
    super();
    this.store = store;
  }

  async get(id?) {
    if (id) {
      return await this.store.sessions.findOne({ where: { id } });
    }
    return await this.store.sessions.findAll();
  }

  async create(surveyId) {
    return await this.store.sessions.create({ surveyId });
  }
}
