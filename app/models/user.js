'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      user.belongsTo(models.account,
          {
            as: 'account',
            foreignKey: 'account_id'
          });

  
    }
  }
  user.init({
    account_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.TINYINT,
    birth_date: DataTypes.DATE,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    document_number:DataTypes.STRING,
    status: DataTypes.TINYINT,
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.get('first_name')} ${this.get('last_name')?this.get('last_name'):''}`;
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};