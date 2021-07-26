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
// router.post('/recover_password', AuthController.recover_password);
// router.post('/recover/change_password', AuthController.change_password);

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
/*Fruit types */
//save fruit type
router.post('/fruit_types', auth.required, FruitController.saveFruitType);
//get fruit types
router.get('/fruit_types', auth.required, FruitController.getFruitTypes);
//get fruit type by id
router.get('/fruit_types/:fruit_type_id', auth.required, FruitController.getFruitTypebyId);
//get fruit type by fruit_id
router.get('/fruit_types/byFruitId/:fruit_id', auth.required, FruitController.getFruitTypebyFruitId);
//update fruit Type
router.put('/fruit_types/:fruit_type_id', auth.required, FruitController.updateFruitType);
//delete fruit Type
router.delete('/fruit_types/:fruit_type_id', auth.required, FruitController.deleteFruitType);
/*Fruit types analisys */
//save fruit type analysis
router.post('/fruit_types_analysis', auth.required, FruitController.saveFruitTypeAnalysis);
//get fruit type analisys
router.get('/fruit_types_analysis', auth.required, FruitController.getFruitTypesAnalysis);
//get fruit type analisys by id
router.get('/fruit_types_analysis/:fruit_types_analysis_id', auth.required, FruitController.getFruitTypesAnalysisbyId);
//get fruit type analisys by fruit_type_id
router.get('/fruit_types_analysis/byFruitTypeId/:fruit_type_id', auth.required, FruitController.getFruitTypesAnalysisbyTypeId);
//get fruit type analisys by fruit_id
router.get('/fruit_types_analysis/byFruitId/:fruit_id', auth.required, FruitController.getFruitTypesAnalysisbyFruitId);
//upate fruit type analisys by id
router.put('/fruit_types_analysis/:fruit_types_analysis_id', auth.required, FruitController.updategetFruitTypesAnalysis);
//delete fruit type analisys by id
router.delete('/fruit_types_analysis/:fruit_types_analysis_id', auth.required, FruitController.deleteFruitTypesAnalysis);



router.get('/images/:key',UtilController.getImage);
//upload image by key.
router.post('/images',upload.single('image'),auth.required,UtilController.uploadImage);



module.exports = router;
