const { DataSource } = require('apollo-datasource');

class SurveyAPI extends DataSource {

  constructor({ store }) {
    super();
    this.store = store;
  }

  async get(id) {
    if (id) {
      return await this.store.surveys.findOne({where: {id}});
    }
    return await this.store.surveys.findAll();
  }

  async create(name) {

    const existing = await this.store.surveys.find({where: {name}});

    if (existing) {
      return null;
    }

    return await this.store.surveys.create({name});
  }

}

module.exports = SurveyAPI;
