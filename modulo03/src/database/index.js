import Sequelize from 'sequelize'; // ORM tool - using Postgres relational DB
import mongoose from 'mongoose'; // DAL tool to access non-relational DB MongoDB

// Database configuration
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // PostGres DB Connection (via Sequelize) Relational DB
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // MongoDB Connection (via mongoose) Non-Relational DB
  // Source: MongoDB Atlas Cloud Cluster (No-SQL)
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://pcontra:pcontra@mycluster-q8yoz.mongodb.net/gobarber?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
