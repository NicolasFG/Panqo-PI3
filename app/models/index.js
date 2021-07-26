'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];
const db = {};
const env2 = require(__dirname + '/../config/env.js');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {

  console.log(env);
  if(env=='production'){

    sequelize = new Sequelize(env2.database, env2.username, env2.password, {
      host: env2.host,
      dialect: env2.dialect,
      operatorsAliases: false,
    
      pool: {
        max: env2.max,
        min: env2.pool.min,
        acquire: env2.pool.acquire,
        idle: env2.pool.idle
      }
    });

  }else{

    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
