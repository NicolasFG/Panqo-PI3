const Fruit = require('../models').fruit;
const FruitTypes = require ('../models').fruit_types;
const FruitTypesAnalysis = require ('../models').fruit_types_analysis;
const sequelize = require('sequelize');
const Op = sequelize.Op;


async function saveFruit(req,res) {
    const account = res.locals.account;
    try {

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function updateFruit (req,res){

    try {

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getFruit(req,res) {   

    try {

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function updateFruitType(req,res) {

    try {

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
    
}

async function updategetFruitTypesAnalysis(req,res) {

    try {

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
    
}

async function getFruitType(res,res){

    try {

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function getFruitTypesAnalysis(req,res){

    try {

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}