import { Model, Sequelize } from 'sequelize';

class MeetappAppointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize, // Sequelize connection obj
      }
    );

    return this;
  }

  static associate(models) {
    // user_id and provider_id are FOREIGN KEYS that reside
    // on Appointment Table. This FK will be pointed to the table User PK Id
    // You will need to use "as" to distinguish "normal user" to "provider user"
    this.belongsTo(models.MeetappUser, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(models.MeetappUser, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

export default MeetappAppointment;
