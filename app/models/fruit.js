'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fruit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      fruit.hasMany(models.fruit_types,{
        as: "fruit_types",
        foreignKey: "fruit_id",
        targetKey:"fruit_id"
      });

    }
  };
  fruit.init({
    name: DataTypes.STRING,
    origin: DataTypes.STRING,
    image_key: DataTypes.STRING,
    status: DataTypes.TINYINT,
    image_url:{
      type:DataTypes.VIRTUAL,
      get(){
        if(this.get('image_key')){
          return  `${process.env.API_URL}/api/images/${this.get('image_key')}`
        }else{
          return null;
        }
      }
    }
  }, {
    sequelize,
    modelName: 'fruit',
  });
  return fruit;
};