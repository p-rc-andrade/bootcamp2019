import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // Method will be called automatically by Sequelize
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,

        // VIRTUAL refers to a field that wont exist on the DB
        password: Sequelize.VIRTUAL,

        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // Sequelize connection object
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
