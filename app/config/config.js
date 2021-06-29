require('dotenv').config();
const llave = process.env.LLAVE || 'itsverysecret';
const sendgrid_api_key = process.env.SENDGRID_API_KEY || 'itsverysecret';
module.exports = {
    llave: llave,
    sendgrid_api_key: sendgrid_api_key
}