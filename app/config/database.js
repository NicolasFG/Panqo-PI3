require('dotenv').config();
// const fs = require('fs');

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        timezone: '-05:00',
        dialectOptions: {
            supportBigNumbers: true,
            // bigNumberStrings: true,
        }
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_DATABASE,
        host: process.env.CI_DB_HOST,
        port: process.env.CI_DB_PORT,
        dialect: 'postgres',
        timezone: '-05:00',
        dialectOptions: {
            supportBigNumbers: true,
            // bigNumberStrings: true,
        }
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'postgres',
        timezone: '-05:00',
        dialectOptions: {
            supportBigNumbers: true,
            // bigNumberStrings: true,
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
            // }
        }
    }
};
