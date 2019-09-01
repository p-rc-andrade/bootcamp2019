import { Model, Sequelize } from 'sequelize';

class User extends Model {
  // Method will be called automatically by Sequelize
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // Sequelize connection object
      }
    );
  }
}

export default User;
