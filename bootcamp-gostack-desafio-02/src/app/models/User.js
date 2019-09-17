import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class MeetappUser extends Model {
  static init(sequelize) {
    // console.log(sequelize);
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Aux Virtual field - Not stored on DB
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // Sequelize connection obj
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Compares the given password with the password_hash
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default MeetappUser;
