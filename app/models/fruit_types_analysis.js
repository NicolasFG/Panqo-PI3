'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fruit_types_analysis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fruit_types_analysis.init({
    fruit_type_id: DataTypes.INTEGER,
    status: DataTypes.TINYINT,
    image_key: DataTypes.STRING,
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
    modelName: 'fruit_types_analysis',
  });
  return fruit_types_analysis;
};