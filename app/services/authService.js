const bcrypt = require('bcrypt');
const Account = require('../models').account;
const {generateToken, mailNewRegister} = require('./utilService');
const sequelize = require('sequelize');
const axios = require('axios')

const newAccount = async (dataAccount, req) => {
    dataAccount.password = await bcrypt.hash(dataAccount.password, 12);
    dataAccount.role = 'user';
    dataAccount.status = 1;
    console.log('crear cuenta:', dataAccount);
    let account = await Account.create(dataAccount);
    account = account.get({plain: true});
    let token = await generateToken(account)
    delete account.password;

    // mailNewRegister(account);
    
    return {
        account: account,
        token: token
    }
}


const validateLogin = async (dataAccount, req) => {
    let account = await Account.findOne(
        {
            where: {email: dataAccount.email},
            attributes: ['id',
                         'email',
                         'token_recover',
                         'valid_token',
                         'term_cond',
                         'role',
                         'status',
                         'createdAt',
                         'password',
                         'updatedAt'
                        ],
        }
        )
    if (account) {
        if (await bcrypt.compare(dataAccount.password, account.password)) {
            account = account.get({plain: true});
            let token = await generateToken(account)
            delete account.password;
            return {
                account: account,
                token: token
            }
        }
    }
    return false;
}


module.exports = {newAccount, validateLogin};
