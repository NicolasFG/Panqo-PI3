'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fruit_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fruit_types.init({
    fruit_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'fruit_types',
  });
  return fruit_types;
};