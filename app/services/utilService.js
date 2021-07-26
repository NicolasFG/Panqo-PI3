require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail')
// const Account = require('../models').account;
const moment = require('moment');


const mailNewRegister = async (data) => {
    if(data){

        sgMail.setApiKey(config.sendgrid_api_key)
        const msg = {
            to: data.email, // Change to your recipient
            from: 'jorge.vasquez@utec.edu.pe', // Change to your verified sender
            subject: 'Bienvenido a Panqo',
            templateId: 'd-7748279442164de39060d2af8c06004c',
            dynamic_template_data: {nombre:data.fullname?data.fullname:''},
        }
        return sgMail
            .send(msg)
            .then(() => {
                return data
            })
            .catch((error) => {
                // console.log("error_email: ", error)
                console.log("error_email_user_register: ", error.response.body)
                return false;
            });
    }
    return false;
}

const recoverPassword = async (account) => {
    if (account) {
        let token_recover = randomString(32)+account.id;
        // let hash_pass = await bcrypt.hash(password_temporal, 12);
        let valid_token = moment().add(7,'hours').format('YYYY-MM-DD HH:mm:ss');
        await account.update({token_recover: token_recover, valid_token:valid_token});
        // account.password = await bcrypt.hash(password_temporal, 12)
        // await account.save();
        sgMail.setApiKey(config.sendgrid_api_key);
        let data_mail = {
            "email":account.email,
            "name":account.fullname?account.fullname:'',
            "clave":"",
            "url":`${process.env.WEB_URL}/new-password?token=${token_recover}`
        };
        const msg = {
            to: account.email, // Change to your recipient
            from: 'jorge.vasquez@utec.edu.pe', // Change to your verified sender
            subject: 'Recuperación de contraseña',
            templateId: 'd-4e469f3e64b54653ab6511aa29acca8b',
            dynamic_template_data: data_mail,
        }
        return sgMail
            .send(msg)
            .then(() => {
                return token_recover
            })
            .catch((error) => {
                // console.log("error_email: ", error)
                console.log("error_email2: ", error.response.body)
                return false;
            });

    }
    return false;
}

const changePassword = async (account, password) => {
    let date = moment(account.valid_token)
    let now = moment();
    console.log('fechatoken',date);
    console.log('fechaahora',now);
    if (now < date) {
        // procede
        let hash_pass = await bcrypt.hash(password, 12);
        await account.update({
            password: hash_pass,
            token_recover: null,
            valid_token:null});
        return true;
    } else {
        // no procede
        return  false;

    }
}


const randomString = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const generateToken = async (data) => {
    return jwt.sign(data, config.llave, {
        expiresIn: 60 * 60 * 24 * 365
    });
}

const getPagination = (page, size) => {
    const limit = size ? +size : 20;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };


const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, rows, totalPages, currentPage };
  };

module.exports = { generateToken, randomString, recoverPassword, changePassword,getPagingData,getPagination,
      mailNewRegister};
