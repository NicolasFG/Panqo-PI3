'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
      'fruit_types_analysis',
      'result',
      {
        type: Sequelize.INTEGER,
        defaultValue: null
      }
     ),
    queryInterface.addColumn(
      'fruit_types_analysis',
      'result_text',
      {
        type: Sequelize.STRING,
        defaultValue: null,
      }
    )
   ]);
  },

  down: async (queryInterface, Sequelize) => {
  return Promise.all([
      queryInterface.removeColumn(
      'fruit_types_analysis',
      'result'
     ),
     queryInterface.removeColumn(
      'fruit_types_analysis',
      'result_text'
     ),  
   ]);
  }
};
