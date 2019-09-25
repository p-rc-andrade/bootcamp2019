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
        // avatar_id: Sequelize.INTEGER,
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

  // Used to associate the File model to the User model
  // User table has a avatar_id column
  static associate(models) {
    // This will add avatar_id from File table to the User table
    this.belongsTo(models.MeetappFile, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
    // This would add userId to the File table.
    // this.hasOne(models.File, { foreignKey: 'avatar_id' });
    // This would add userId to multiple defined tables
    // this.hasMany(...)
  }

  // Compares the given password with the password_hash
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default MeetappUser;
