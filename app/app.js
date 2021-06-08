const express = require('express');
const config = require('./config/config');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.set('llave', config.llave);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: false}))

// use routes
app.use('/', routes);

module.exports = app;