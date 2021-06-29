const config = require('../config/config');
const jwt = require('jsonwebtoken');

const required = (req, res, next) => {
  let token = req.headers['authorization']
  if(!token){
    res.status(401).send({
      error: "Es necesario el token de autenticación"
    })
    return
  }

  jwt.verify(token, config.llave, function(err, account) {
    if (err) {
      res.status(401).send({
        error: 'Token inválido'
      })
    } else {
      res.locals.account = account;
      // res.locals.odoo = odoo.connect(user,res);
      next();
    }
  })
}

module.exports = {required};
