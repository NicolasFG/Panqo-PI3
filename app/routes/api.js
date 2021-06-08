const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');


const auth = require('./auth');

router.get('/authenticate/facebook/', AuthController.authFacebook);
router.get('/authenticate/google/', AuthController.authGoogle);


router.get('/info/:district_id?', AuthController.info);
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/recover_password', AuthController.recover_password);
router.post('/recover/change_password', AuthController.change_password);
router.post('/register/business', AuthController.registerBusiness);
router.post('/register/muni', AuthController.registerMuni);
router.get('/account', auth.required ,AuthController.user);
router.post('/account', auth.required ,AuthController.editUser);



router.get('/accounts', auth.required, AccountController.index);
router.post('/account/accept', auth.required, AccountController.acceptRequest);
router.post('/account/deny', auth.required, AccountController.denyRequest);
router.post('/account/unsuscribe', auth.required, AccountController.unsuscribe);


router.get('/account/users', auth.required, UserController.accountUsers);
router.post('/account/user', auth.required, UserController.accountUserSave);
router.post('/account/user/:account_id', auth.required, UserController.accountUserEdit);
router.post('/account/user/:account_id/delete', auth.required, UserController.accountUserDelete);
router.post('/account/users/delete', auth.required, UserController.accountManyUserDelete);
router.get('/account/user/profile/:account_id',auth.required,UserController.getUserProfile)
router.get('/account/user/profile',auth.required,UserController.getUserProfile)
router.post('/account/change_password',auth.required,UserController.changePassword)

module.exports = router;
