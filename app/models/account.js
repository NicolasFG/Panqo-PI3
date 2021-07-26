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
  
    }
  }
  account.init({
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    token_recover: DataTypes.STRING,
    valid_token: DataTypes.STRING,
    term_cond: DataTypes.TINYINT,
    role: DataTypes.STRING,
    status: DataTypes.TINYINT, //1 habilitado //3 password_temporal //4 por aprobar de admin //2 desaprobado
    // rol_usuario: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     const rawValue = this.get('role');
    //     if(rawValue){
    //       if(rawValue.substr(0,3) === 'sub'){
    //         return 'Usuario'
    //       }else{
    //         return 'Administrador'
    //       }
    //     }
    //     return null;
    //   }
    // },
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.get('first_name')} ${this.get('last_name')?this.get('last_name'):''}`;
      }
    }
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};