import Sequelize from 'sequelize';

// Database configuration
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

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
