import Sequelize from 'sequelize';

// Database configuration
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => {
      return model.init(this.connection);
    });
  }
}

export default new Database();
