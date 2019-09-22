import { Model, Sequelize } from 'sequelize';

class MeetappFile extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize, // Sequelize connection obj
      }
    );

    return this;
  }
}

export default MeetappFile;
