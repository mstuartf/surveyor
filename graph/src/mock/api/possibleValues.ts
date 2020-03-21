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

  async create(questionId, order, value, label) {
    return await this.store.possibleValues.create({
      questionId,
      order,
      value,
      label
    });
  }
}
