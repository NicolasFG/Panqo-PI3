require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail')
const Account = require('../models').account;
const User = require('../models').user;
const moment = require('moment');

const mailActivate = async (account_id) => {
    if(account_id){
        let account = await Account.findByPk(account_id,{
            attributes: {exclude: ['password']},
            include: [{
                model: User,
                as: "user"
            }],
        });
        let password_temporal = randomString(6);
        let hash_pass = await bcrypt.hash(password_temporal, 12);
        account.update({password: hash_pass});

        sgMail.setApiKey(config.sendgrid_api_key)
        let data = {
            "url_login":process.env.WEB_URL+'/iniciar-sesion',
            "name":account.user?account.user.fullname:'',
            "email":account.email,
            "clave":password_temporal
        };
        const msg = {
            to: account.email, // Change to your recipient
            from: 'soporte@operativa.pe', // Change to your verified sender
            subject: 'Su cuenta ha sido activada',
            templateId: 'd-a30483ec335c41c3856b6cc4dcb0e1bb',
            dynamic_template_data: data,
        }
        return sgMail
            .send(msg)
            .then(() => {
                return password_temporal
            })
            .catch((error) => {
                // console.log("error_email: ", error)
                console.log("error_email2: ", error.response.body)
                return false;
            });
    }
    return false;
}

const mailNewSubUser = async (data) => {
    if(data){

        sgMail.setApiKey(config.sendgrid_api_key)
        const msg = {
            to: data.email, // Change to your recipient
            from: 'soporte@operativa.pe', // Change to your verified sender
            subject: 'Su cuenta ha sido activada',
            templateId: 'd-a30483ec335c41c3856b6cc4dcb0e1bb',
            dynamic_template_data: data,
        }
        return sgMail
            .send(msg)
            .then(() => {
                return data
            })
            .catch((error) => {
                // console.log("error_email: ", error)
                console.log("error_email2: ", error.response.body)
                return false;
            });
    }
    return false;
}

const mailNewRegister = async (data) => {
    if(data){

        sgMail.setApiKey(config.sendgrid_api_key)
        const msg = {
            to: data.email, // Change to your recipient
            from: 'soporte@operativa.pe', // Change to your verified sender
            subject: 'Bienvenido a Operativa',
            templateId: 'd-d4231dc287a7478b9489d30eb029c25c',
            dynamic_template_data: {nombre:data.user?data.user.fullname:''},
        }
        return sgMail
            .send(msg)
            .then(() => {
                return data
            })
            .catch((error) => {
                // console.log("error_email: ", error)
                console.log("error_email_postulante_register: ", error.response.body)
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
            "name":account.user?account.user.first_name:'',
            "clave":"",
            "url":`${process.env.WEB_URL}/new-password?token=${token_recover}`
        };
        const msg = {
            to: account.email, // Change to your recipient
            from: 'soporte@operativa.pe', // Change to your verified sender
            subject: 'Recuperación de contraseña',
            templateId: 'd-ff56666decfe4e26a3624bd0d0e391f9',
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

const sendMailContactBusiness = async (data) => {
    if(data){

        sgMail.setApiKey(config.sendgrid_api_key)
        const msg = {
            to: 'soporte@operativa.pe', // Change to your recipient
            from: 'soporte@operativa.pe', // Change to your verified sender
            subject: 'Operativa - Contacto Empresa',
            templateId: 'd-4601ecaf70464884966a002648c8c980',
            dynamic_template_data: data,
        }
        return sgMail
            .send(msg)
            .then(() => {
                return data
            })
            .catch((error) => {
                // console.log("error_email: ", error)
                console.log("error_email2: ", error.response.body)
                return false;
            });
    }
    return false;
}

const sendMailContactPostulante = async (data) => {
    if(data){

        sgMail.setApiKey(config.sendgrid_api_key)
        const msg = {
            to: 'soporte@operativa.pe', // Change to your recipient
            from: 'soporte@operativa.pe', // Change to your verified sender
            subject: 'Operativa - Contacto Postulante',
            templateId: 'd-062e98886658415c93b248683b4d5d75',
            dynamic_template_data: data,
        }
        return sgMail
            .send(msg)
            .then(() => {
                return data
            })
            .catch((error) => {
                // console.log("error_email: ", error)
                console.log("error_email2: ", error.response.body)
                return false;
            });
    }
    return false;
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

module.exports = {mailActivate, generateToken, randomString, recoverPassword, changePassword, mailNewSubUser,getPagingData,getPagination,
    sendMailContactBusiness, sendMailContactPostulante, mailNewRegister};
