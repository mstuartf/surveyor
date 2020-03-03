import { DataSource } from "apollo-datasource";

export class PossibleValueAPI extends DataSource {
  private store;

  constructor({ store }) {
    super();
    this.store = store;
  }

  async get() {
    return await this.store.possibleValues.findAll();
  }
}
