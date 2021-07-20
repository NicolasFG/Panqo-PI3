const express = require('express');
const router = express.Router();
//const AccountController = require('../controllers/AccountController');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const UtilController = require('../controllers/UtilController');
const FruitController = require('../controllers/FruitController');

const multer= require('multer');
const upload= multer({dest:'uploads/'});


const auth = require('./auth');
const { Route53Resolver } = require('aws-sdk');



router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/recover_password', AuthController.recover_password);
router.post('/recover/change_password', AuthController.change_password);
router.post('/account/user', auth.required, UserController.save);
//editar user propio.
router.post('/account', auth.required ,AuthController.editUser);
//get profile by account_id
router.get('/account/user/profile/:account_id',auth.required,UserController.getUserProfile)
//get profle by token.
router.get('/account/user/profile',auth.required,UserController.getUserProfile)



//get image by key
router.get('/images/:key',UtilController.getImage);
//upload image by key.
router.post('/images',upload.single('image'),auth.required,UtilController.uploadImage);

//fruit controller.


module.exports = router;
