'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      account.hasOne(models.user,{
        as: "user",
        foreignKey: "account_id",
        // targetKey: "id"
      });
    }
  }
  account.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token_recover: DataTypes.STRING,
    valid_token: DataTypes.STRING,
    term_cond: DataTypes.TINYINT,
    role: DataTypes.STRING,
    status: DataTypes.TINYINT, //1 habilitado //3 password_temporal //4 por aprobar de admin //2 desaprobado
    rol_usuario: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.get('role');
        if(rawValue){
          if(rawValue.substr(0,3) === 'sub'){
            return 'Usuario'
          }else{
            return 'Administrador'
          }
        }
        return null;
      }
    }
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};