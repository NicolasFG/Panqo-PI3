'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fruit_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fruit_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'fruit',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('fruit_types');
  }
};