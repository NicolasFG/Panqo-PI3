'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fruit_types_analyses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fruit_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'fruit_types',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.TINYINT
      },
      image_key: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('fruit_types_analyses');
  }
};