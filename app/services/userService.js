require('dotenv').config();
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Account = require('../models').account;
const User = require('../models').user;
const {randomString, mailNewSubUser} = require('./utilService');
const Op = sequelize.Op;

const subAccountUserSave = async (body, session_account_id) => {

    const accountMaster = await Account.findByPk(session_account_id);
    let dataAccount = {};
    dataAccount.account_id = session_account_id;
    let password_temporal = randomString(6);
    dataAccount.password = await bcrypt.hash(password_temporal, 12);
    dataAccount.email = body.email;
    dataAccount.term_cond = 1;
    dataAccount.role = `sub-${accountMaster.role}`;
    dataAccount.status = 1;

    let account = await Account.create(dataAccount);

    let dataUser = {
        'account_id': account.id,
        'first_name': body.user.first_name,
        'last_name': body.user.last_name,
        'area_input': body.user.area_input,
        'cargo_input': body.user.cargo_input,
    }
    await User.create(dataUser);

    let data = {
        "url_login":process.env.WEB_URL+'/inicio-sesion',
        "name":body.user.first_name,
        "email":body.email,
        "clave":password_temporal
    };
    await mailNewSubUser(data)
    account = account.get({plain: true});

    delete account.password;

    return {
        account: account,
    }
}

const subAccountUserUpdate = async (body, account_id) => {
    let dataAccount = {};
    dataAccount.email = body.email;

    await Account.update(dataAccount, {returning: true, where: {id: account_id}});

    let dataUser = {
        'first_name': body.user.first_name,
        'last_name': body.user.last_name,
        'area_input': body.user.area_input,
        'cargo_input': body.user.cargo_input,
    }
    await User.update(dataUser, {returning: true, where: {account_id: account_id}});

    const account = await Account.findByPk(account_id,{
        attributes: {exclude: ['password']},
        include: [{
            model: User,
            as: "user"
        }],
    });
    return {
        account: account,
    }
}

const subAccountUserDelete = async (account_id) => {
    await Account.update({status:2}, {returning: true, where: {id: account_id}});
    return 'Usuario Eliminado';
}

const subAccountUsersDelete = async (users) =>{
    let result=[]
    for (const account_id of users) {
        await Account.update({status:2}, {returning: true, where: {id: account_id}}).then((rres)=>{
            result.push({message:"Usuario Eliminado",account_id:account_id});
        }).catch(async (error) => {
            result.push({message:error,account_id:account_id,error:'f'});
        });
      }
    return result;
}

module.exports = {
    subAccountUserSave,
    subAccountUserUpdate,
    subAccountUserDelete,
    subAccountUsersDelete,
};