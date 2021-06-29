const bcrypt = require('bcrypt');
const Account = require('../models').account;
const User = require('../models').user;
const {generateToken, mailNewRegister} = require('./utilService');
const sequelize = require('sequelize');
const axios = require('axios')

const newAccount = async (dataAccount, req) => {
    dataAccount.password = await bcrypt.hash(dataAccount.password, 12);
    dataAccount.role = 'postulante';
    dataAccount.status = 1;
    console.log('crear cuenta:', dataAccount);
    let account = await Account.create(dataAccount);
    account = account.get({plain: true});
    let token = await generateToken(account)
    delete account.password;

    //mailNewRegister(account);
    
    return {
        account: account,
        token: token
    }
}

const requestBusiness = async (data, req) => {
    let dataAccount = {};
    dataAccount.email = data.email;
    dataAccount.razon_social = data.razon_social;
    dataAccount.term_cond = 1;
    dataAccount.role = 'business';
    dataAccount.password = await bcrypt.hash('default', 12);
    dataAccount.status = 4;

    let account = await Account.create(dataAccount);
    delete account.dataValues.password;

    let dataUser = {
        'account_id': account.id,
        'first_name': data.first_name,
        'last_name': data.last_name,
        'document_id': 2,
        'document_number': data.document_number,
        'phone': data.phone,
        'area_input': data.area_input,
        'cargo_input': data.cargo_input,
        'interest_rubro_id': data.interest_rubro_id,
    }
    
    return await User.create(dataUser,{returning: true}).then(async (user)=>{
        
        return {
            message: "Se verificarán los datos de la empresa y se enviará un correo para que pueda ingresar.",
            account: account,
            // token: token,
            user: user
        }
    }).catch(async (error) => {
        account.destroy();
        return {
            message:error
        }
    });
    // let token = await generateToken(account.get({plain: true}))
}

const requestMuni = async (data, req) => {
    let dataAccount = {};
    dataAccount.email = data.email;
    dataAccount.razon_social = data.razon_social;
    dataAccount.term_cond = 1;
    dataAccount.role = 'muni';
    dataAccount.password = await bcrypt.hash('default', 12);
    dataAccount.status = 4;

    let account = await Account.create(dataAccount);
    delete account.dataValues.password;
    let dataUser = {
        'account_id': account.id,
        'first_name': data.first_name,
        'last_name': data.last_name,
        'document_id': 2,
        'document_number': data.document_number,
        'phone': data.phone,
        'area_input': data.area_input,
        'district_id': data.district_id,
        'cargo_input': data.cargo_input
    }
    return await User.create(dataUser).then(async (user)=>{
        return {
            message: "Se verificarán los datos de la empresa y se enviará un correo para que pueda ingresar.",
            account: account,
            // token: token,
            user: user
        }
    }).catch(async (error)=>{
        account.destroy();
        return {
            message: error
        }
    });
}

const validateLogin = async (dataAccount, req) => {
    let account = await Account.findOne(
        {
            where: {email: dataAccount.email},
            attributes: ['id',
                         'rol_usuario',
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

const loginFacebook = async (code, req) => {

    let accessToken = await getAccessTokenFbFromCode(code);
    if(accessToken){
        try {
            const resp = await axios({
                url: 'https://graph.facebook.com/me',
                method: 'get',
                params: {
                  fields: ['id', 'email', 'first_name', 'last_name'].join(','),
                  access_token: accessToken,
                },
            });
            console.error('RESPUESTAAAA DARA_USER****************************');
            console.log(resp.data);

            let login = await loginSocial({email:resp.data.email,  social_id :resp.data.id},'facebook');
            if(login){
                return login;
            }
            
            return false;
            
        } catch (err) {
            // Handle Error Here
            return false;
        }
    }else{
        return false;
    }
    
}

const loginGoogle = async (code, req) => {

    let access_token = await getAccessTokenGoogleFromCode(code);
    if(access_token){
        try {
            const resp = await axios({
                url: 'https://www.googleapis.com/oauth2/v2/userinfo',
                method: 'get',
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              });
            console.error('RESPUESTAAAA DARA_USER****************************');
            console.log(resp.data);

            let login = await loginSocial({email:resp.data.email,  social_id :resp.data.id},'google');
            if(login){
                return login;
            }
            
            return false;
            
        } catch (err) {
            // Handle Error Here
            return false;
        }
    }else{
        return false;
    }
    
}

async function getAccessTokenFbFromCode(code) {
    try {
        const resp = await axios({
            url: 'https://graph.facebook.com/v4.0/oauth/access_token',
            method: 'get',
            params: {
              client_id: process.env.APP_FB_CLIENT_ID,
              client_secret: process.env.APP_FB_SECRET_ID,
              redirect_uri: process.env.APP_FB_REDIRECT_URI,
              code,
            },
          });
        console.error('RESPUESTAAAA TOKEN****************************');
        console.log(resp.data.access_token);
        return resp.data.access_token;
    } catch (err) {
        // Handle Error Here
        return false;
    }
};

async function getAccessTokenGoogleFromCode(code) {
    try {
        const resp = await axios({
            url: `https://oauth2.googleapis.com/token`,
            method: 'post',
            data: {
              client_id: process.env.APP_GOOGLE_CLIENT_ID,
              client_secret: process.env.APP_GOOGLE_SECRET_ID,
              redirect_uri: process.env.APP_GOOGLE_REDIRECT_URI,
              grant_type: 'authorization_code',
              code,
            },
          });
        console.error('RESPUESTAAAA TOKEN GOOGLE****************************');
        console.log(resp.data.access_token);
        return resp.data.access_token;
    } catch (err) {
        // Handle Error Here
        return false;
    }
};

async function loginSocial(dataSocial,social){
    let where = social == 'facebook'?{facebook_id:dataSocial.social_id}:{google_id:dataSocial.social_id};
    let account = await Account.findOne(
        {
            where: where,
            attributes: ['id',
                         'rol_usuario',
                         'facebook_id',
                         'google_id',
                         'email',
                         'token_recover',
                         'valid_token',
                         'term_cond',
                         'razon_social',
                         'role',
                         'account_id',
                         'suscribe',
                         'motivo_id',
                         'motivo',
                         'status',
                         'createdAt',
                         'password',
                         'updatedAt',
                         [sequelize.literal('(CASE WHEN (SELECT u.id FROM users u where u.account_id=`account`.`id` ) IS NOT NULL THEN 1 ELSE 0 END)'), 'haveUser']
                        ],
        }
        )
    if (account) {
        account = account.get({plain: true});
        console.log('cuenta encontrada:', account);
        let token = await generateToken(account)
        delete account.password;
        return {
            account: account,
            token: token
        }
    }else{
        account = await Account.findOne(
        {
            where: {email:dataSocial.email},
            attributes: ['id',
                         'rol_usuario',
                         'facebook_id',
                         'google_id',
                         'email',
                         'token_recover',
                         'valid_token',
                         'term_cond',
                         'razon_social',
                         'role',
                         'account_id',
                         'suscribe',
                         'motivo_id',
                         'motivo',
                         'status',
                         'createdAt',
                         'password',
                         'updatedAt',
                         [sequelize.literal('(CASE WHEN (SELECT u.id FROM users u where u.account_id=`account`.`id` ) IS NOT NULL THEN 1 ELSE 0 END)'), 'haveUser']
                        ],
        }
        );
        console.log('account',account);
        if(account){
            console.log('existe acc',account);
            account[social+'_id'] = dataSocial.social_id;
            await account.save();
            console.log('account:', account);
            account = await account.get({plain: true});
            let token = await generateToken(account)
            delete account.password;
            return {
                account: account,
                token: token
            }
        }else{
            
            let dataAccount = social == 'facebook'?{email:dataSocial.email,facebook_id:dataSocial.social_id}:{email:dataSocial.email,google_id:dataSocial.social_id};
            dataAccount.role = 'postulante';
            dataAccount.status = 1;
            console.log('crear cuenta3:', dataAccount);
            let account = await Account.create(dataAccount);
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

module.exports = {newAccount, validateLogin, requestBusiness, requestMuni, loginFacebook, loginGoogle};
