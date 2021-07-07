const {
  newAccount,
  validateLogin,
  requestBusiness,
  requestMuni,
  loginFacebook,
  loginGoogle,
} = require('../services/authService');
const { recoverPassword, changePassword } = require('../services/utilService');
const Account = require('../models').account;
const User = require('../models').user;

async function register(req, res) {
  if (await Account.findOne({ where: { email: req.body.email } })) {
    return res
      .status(401)
      .send({ message: 'La cuenta ya se encuentra registrada' });
  } else {
    const dataAccount = await newAccount(req.body);
    return res.send(dataAccount);
  }
}

async function registerBusiness(req, res) {
  if (await Account.findOne({ where: { email: req.body.email } })) {
    return res
      .status(401)
      .send({ message: 'La cuenta ya se encuentra registrada' });
  } else {
    const dataAccount = await requestBusiness(req.body);
    return res.send(dataAccount);
  }
}

async function registerMuni(req, res) {
  if (await Account.findOne({ where: { email: req.body.email } })) {
    return res
      .status(401)
      .send({ message: 'La cuenta ya se encuentra registrada' });
  } else {
    const dataAccount = await requestMuni(req.body);
    return res.send(dataAccount);
  }
}

async function login(req, res) {
  const dataAccount = await validateLogin(req.body);
  if (dataAccount) {
    return res.send(dataAccount);
  } else {
    return res.status(401).send({ message: 'Email o password incorrectos.' });
  }
}

async function recover_password(req, res) {
  const account = await Account.findOne({
    where: { email: req.body.email },
    include: [
      {
        model: User,
        as: 'user',
      },
    ],
  });
  if (account) {
    if (account.status === 2) {
      return res.status(401).send({ message: 'Cuenta no ha sido aprobada.' });
    }
    if (account.status === 4) {
      return res
        .status(401)
        .send({ message: 'Cuenta debe ser aprobada por un administrador.' });
    }
    let password_temporal = await recoverPassword(account);
    if (password_temporal) {
      return res.send({
        message: 'Se envió un correo .',
      });
    }
    return res
      .status(401)
      .send({ message: 'Error inesperado, por favor intente en unos minutos' });
  } else {
    return res.status(401).send({ message: 'Email no registrado' });
  }
}

async function change_password(req, res) {
  const account = await Account.findOne({
    where: { token_recover: req.body.token },
  });

  if (account) {
    if (req.body.password !== req.body.password_confirmed) {
      return res.status(401).send({ message: 'Password deben ser iguales.' });
    }
    let result = await changePassword(account, req.body.password);
    if (result) {
      return res.send({
        message: 'Password actualizado correctamente.',
      });
    }
    return res.status(401).send({ message: 'Token expiró' });
  } else {
    return res.status(401).send({ message: 'Token no válido' });
  }
}

async function user(req, res) {
  const { id } = res.locals.account;
  const account = await Account.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [{ model: User, as: 'user' }],
  });
  return res.send({
    account: account,
  });
}

async function info(req, res) {
  const registrados = await Account.count();

  let count_district = 0;
  if (req.params.district_id) {
    count_district = await User.count({
      where: {
        status: 1,
        district_id: req.params.district_id,
      },
    });
  }

  return res.send({
    registrados: registrados,
    count_district: count_district,
  });
}

async function editUser(req, res) {
  const { id } = res.locals.account;
  let tmpbody = req.body;
  let eAccount = {};
  if ('email' in tmpbody && tmpbody['email'] != null) {
    eAccount['email'] = tmpbody['email'];
  }
  if ('razon_social' in tmpbody && tmpbody['razon_social'] != null) {
    eAccount['razon_social'] = tmpbody['razon_social'];
  }

  if (Object.keys(eAccount).length != 0) {
    await Account.update(eAccount, { where: { id: id } })
      .then(async (result) => {})
      .catch(function (err) {
        console.log('error:', err);
        return res.status(409).send({ error: err });
      });
  }
  if ('user' in tmpbody) {
    await User.update(tmpbody['user'], { where: { account_id: id } })
      .then(async (result) => {})
      .catch(function (err) {
        console.log('error:', err);
        return res.status(409).send({ error: err });
      });
  }
  const account = await Account.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [{ model: User, as: 'user' }],
  });
  return res.send({
    account: account,
  });
}

async function authFacebook(req, res) {
  let code = req.query.code;
  console.log('code:', code);
  let dataAccount = await loginFacebook(code);
  if (dataAccount) {
    return res.redirect(
      process.env.WEB_URL +
        '/callbackFacebook?token=' +
        dataAccount.token +
        '&email=' +
        dataAccount.account.email +
        '&role=' +
        dataAccount.account.role
    );
  } else {
    return res.redirect(
      process.env.WEB_URL + '/callbackFacebookError?error=Error'
    );
  }
}

async function authGoogle(req, res) {
  let code = req.query.code;
  console.log('code:', code);
  let dataAccount = await loginGoogle(code);
  if (dataAccount) {
    return res.redirect(
      process.env.WEB_URL +
        '/callbackGoogle?token=' +
        dataAccount.token +
        '&email=' +
        dataAccount.account.email +
        '&role=' +
        dataAccount.account.role
    );
  } else {
    return res.redirect(
      process.env.WEB_URL + '/callbackGoogleError?error=Error'
    );
  }
}

module.exports = {
  register,
  login,
  user,
  recover_password,
  change_password,
  registerBusiness,
  registerMuni,
  editUser,
  info,
  authFacebook,
  authGoogle,
};
