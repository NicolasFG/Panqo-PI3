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
      
      fruit_types.belongsTo(models.fruit,{
          as: 'fruit',
          foreignKey: "fruit_id",
          targetKey: "id"
        });

      fruit_types.hasMany(models.fruit_types_analysis,{
        as: "fruit_types_analysis",
        foreignKey: "fruit_type_id",
        // targetKey:'fruit_type_id'
      });
    }
  };
  fruit_types.init({
    fruit_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'fruit_types',
  });
  return fruit_types;
};