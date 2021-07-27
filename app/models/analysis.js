'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class analysis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      analysis.belongsTo(models.account,{
        as:"accounts",
        foreignKey: "account_id",
        targetKey: "id"
      })

      analysis.belongsTo(models.fruit,{
        as:"fruits",
        foreignKey: "fruit_id",
        targetKey: "id"
      })
    }
  };
  analysis.init({
    fruit_id: DataTypes.INTEGER,
    account_id: DataTypes.INTEGER,
    image_key: DataTypes.STRING,
    result: DataTypes.INTEGER,
    result_info: DataTypes.STRING,
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
    modelName: 'analysis',
  });
  return analysis;
};