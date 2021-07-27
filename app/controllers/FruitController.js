const Fruit = require('../models').fruit;
const Analysis = require ('../models').analysis;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const {uploadFile}= require('../../s3');


async function saveFruit(req,res) {
    // const account = res.locals.account;
    try {
        req.body.status=1;
        let fruit = await Fruit.create(req.body);
        return res.send({fruit: fruit, message:"Fruta creada"});

    } catch (error) {
        console.log(error)
        return res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function updateFruit (req,res){

    try {
        
        await Fruit.update(req.body,
            {returning: true, where: {id: req.params.fruit_id}})
            .then(async (result) => {
            let fruit = await Fruit.findByPk(req.params.fruit_id);
            res.send({fruit:fruit,message:"Fruta actualizada."})
        }).catch(function (err) {
            console.log("error:", err);
            res.status(409).send({error: err});
        });

    } catch (error) {
        console.log(error)
        return res.status(401).send({message: 'Error inesperado', error: error});
    }
}
//Manzana, palta y naranja.
async function getFruits(req,res) {   
    try {
        let fruits = await Fruit.findAll({
            where: {
                status:1
            }
         });
        return res.send(fruits);

    } catch (error) {
        console.log(error)
        return res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getFruitById(req,res){

    try{

        let fruit = await Fruit.findByPk(req.params.fruit_id);
        return res.send(fruit);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function deleteFruit(req,res) {
    
    try {

        await Fruit.update({status:0},{
                returning: true,
                where:{
                    id:req.params.fruit_id
                }
            })
            .then(async (result) => {
            let fruit = await Fruit.findByPk(req.params.fruit_id);
            res.send({fruit:fruit,message:"Fruta eliminada."})
        }).catch(function (err) {
            console.log("error:", err);
            res.status(409).send({error: err});
        });

    } catch (error) {
        console.log(error)
        return res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getAnalysisByAccountId(req,res){

    try{

        let analysis = await Analysis.findAll({
            where:{
                account_id:req.params.account_id
            },
            include:[
                {
                    model:Fruit,
                    as:"fruits"
                }
            ]
        });
        return res.send(analysis);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getAnalysis(req,res){

    const {id} = res.locals.account;

    try{
        let analysis = await Analysis.findAll({
            where:{
                account_id:id
            },
            include:[
                {
                    model:Fruit,
                    as:"fruits"
                }
            ]
        });
        return res.send(analysis);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function makeAnalysis(req,res){

    const {id} = res.locals.account;
    try{
        const file=req.file;
        const result = await uploadFile(file);
        let analysis = await Analysis.create({
            account_id:id,
            image_key:result.Key,
            fruit_id:req.body.fruit_id,
            result:1,
            result_info:"Apto"
        });
        return res.send(analysis);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}






module.exports={
    saveFruit,
    updateFruit,
    getFruits,
    getFruitById,
    deleteFruit,
    getAnalysisByAccountId,
    getAnalysis,
    makeAnalysis
}