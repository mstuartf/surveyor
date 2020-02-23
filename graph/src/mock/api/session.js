const { DataSource } = require('apollo-datasource');

class SessionAPI extends DataSource {

  constructor({ store }) {
    super();
    this.store = store;
  }

  async get(id) {
    if (id) {
      return await this.store.sessions.findOne({where: {id}});
    }
    return await this.store.sessions.findAll();
  }

  async create() {
    return await this.store.sessions.create();
  }

}

module.exports = SessionAPI;
