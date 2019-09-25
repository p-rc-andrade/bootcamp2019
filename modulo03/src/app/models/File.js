import { Model, Sequelize } from 'sequelize';

class MeetappFile extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/files/${this.path}`;
          },
        },
      },
      {
        sequelize, // Sequelize connection obj
      }
    );

    return this;
  }
}

export default MeetappFile;
