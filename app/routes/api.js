const express = require('express');
const router = express.Router();
//const AccountController = require('../controllers/AccountController');
// const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const UtilController = require('../controllers/UtilController');
const FruitController = require('../controllers/FruitController');

const multer= require('multer');
const upload= multer({dest:'uploads/'});


const auth = require('./auth');
// const { Route53Resolver } = require('aws-sdk');


/*auth */
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/recover_password', AuthController.recover_password);
router.post('/recover/change_password', AuthController.change_password);

//editar user propio.
router.post('/account', auth.required ,AuthController.editUser);
//get profile by account_id
router.get('/account', auth.required ,AuthController.user);
//update account
router.put('/account',auth.required ,AuthController.editUser);


/*Fruits*/
//save fruit
router.post('/fruit', auth.required, FruitController.saveFruit);
//updte fruit
router.put('/fruit/:fruit_id', auth.required, FruitController.updateFruit);
//get fruits
router.get('/fruits', auth.required, FruitController.getFruits);
//get fruitbyId
router.get('/fruit/:fruit_id', auth.required, FruitController.getFruitById);
//delete fruit
router.delete('/fruit/:fruit_id',auth.required, FruitController.deleteFruit);
/*Fruit Analisis */
//save fruit type

router.get('/analysis', auth.required, FruitController.getAnalysis);

router.get('/analysis/account/:account_id', auth.required, FruitController.getAnalysisByAccountId);


router.get('/images/:key',UtilController.getImage);
//upload image by key.
router.post('/analysis',upload.single('image'),auth.required,FruitController.makeAnalysis);
//router.post('/images',upload.single('image'),auth.required,UtilController.uploadImage);



module.exports = router;
