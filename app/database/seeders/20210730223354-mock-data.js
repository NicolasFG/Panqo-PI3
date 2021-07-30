'use strict';
const {uploadFile}= require('../../s3');
const Analysis = require ('../models').analysis;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   //sequelize-cli db:seed:all
    for(let i=0;i<2;i++){
      //leer la imagen desde una carptea.

      const result = await uploadFile(file);
      let analysis = await Analysis.create({
          account_id:id,
          image_key:result.Key,
          fruit_id:req.body.fruit_id,
          result:1,
          result_info:"Apto"
      });

    }

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
