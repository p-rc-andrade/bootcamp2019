'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'meetapp_users', // Target Table Name
      'avatar_id', // New Column Name
      {
        type: Sequelize.INTEGER,
        references: {
          // Use to define the Foreign Key
          model: 'meetapp_files',
          key: 'id',
          onUpdate: 'CASCADE', // If the file gets updated on Files table it gets
          // updated in this table aswell
          onDelete: 'SET NULL', // If the file is deleted on Files table it
          // sets this column to NULL,
          allowNull: true,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('meetapp_users', 'avatar_id');
  },
};
