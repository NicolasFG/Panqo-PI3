const Fruit = require('../models').fruit;
const FruitTypes = require ('../models').fruit_types;
const FruitTypesAnalysis = require ('../models').fruit_types_analysis;
const sequelize = require('sequelize');
const Op = sequelize.Op;


async function saveFruit(req,res) {
    // const account = res.locals.account;
    try {
        req.body.status=1;
        let fruit = await Fruit.create(req.body);
        return res.send({fruit: fruit, message:"Fruta creada"});

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function updateFruit (req,res){

    try {
        let fruit = await Fruit.update(req.body,{
            where: {id : req.params.fruit_id}
        })
        return res.send({fruit:fruit,message:"Fruta actualizada."})

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getFruits(req,res) {   
    try {
        let fruits = await Fruit.findAll({
            where: {
                status:1
            },
            include:[{
                model:FruitTypes,
                as:"fruit_types"
            }],
            raw:true
         });
        return res.send(fruits);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getFruitById(req,res){

    try{

        let fruit = await Fruit.findByPk(req.params.fruit_id,{
            include:[{
                model:FruitTypes,
                as:"fruit_types"
            }]
        });
        return res.send(fruit);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function deleteFruit(req,res) {
    
    try {

        let fruit= await Fruit.update({status:0},{
            where:{
                id:req.params.fruit_id
            }
        })

        return res.send({fruit:fruit,message:"Fruta eliminada."})

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function saveFruitType(req,res) {
    // const account = res.locals.account;
    try {
        req.body.status=1;
        let fruit_type = await FruitTypes.create(req.body);
        return res.send({fruit_type: fruit_type, message:"Fruta tipo creada"});

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function getFruitTypes(req,res){

    try {

        let fruit_types= FruitTypes.findAll({
            where :{
                status:1
            },
            raw:true
        })

        return res.send(fruit_types);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function getFruitTypebyId(req,res){

    try {

        let fruit_type=FruitTypes.findByPk(req.params.fruit_type_id,{
            include:[{
                model:FruitTypesAnalysis,
                as:"fruit_types_analysis"
            }],
        });

        return res.send(fruit_type);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function getFruitTypebyFruitId(req,res){

    try {

        let fruit_types=FruitTypes.findAll(
                {
                    where: {
                        fruit_id: req.params.fruit_id,
                        status: 1
                    },
                    raw:true
                }
            );

        return res.send(fruit_types);

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function updateFruitType(req,res) {

    try {

        let fruit_type = await FruitTypes.update(req.body,{
            where: {id : req.params.fruit_type_id}
        })
        return res.send({fruit_type:fruit_type,message:"Tipo de fruita actualizada."})


    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
    
}

async function deleteFruitType(res,res){

    try {

        let fruit_type= await FruitTypes.update({status:0},{
            where:{
                id: req.params.fruit_type_id
            }
        })

        return res.send({fruit_type:fruit_type,message:"Tipo de fruta eliminada."})

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function saveFruitTypeAnalysis(req,res) {
    // const account = res.locals.account;
    try {
        req.body.status=1;
        let fruit_types_analysis = await FruitTypesAnalysis.create(req.body);
        return res.send({fruit_types_analysis: fruit_types_analysis, message:"Analsis de tipo de fruta creado"});

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }

}

async function getFruitTypesAnalysis(req,res){

    try {
        let fruit_types_analysis=FruitTypesAnalysis.findAll({
            where:{
                status:1
            }
        })
        return res.send(fruit_types_analysis)
    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getFruitTypesAnalysisbyId(req,res){

    try {
        let fruit_types_analysis=FruitTypesAnalysis.findAll({
            where:{
                status:1,
                id: req.params.fruit_types_analysis_id
            }
        })
        return res.send(fruit_types_analysis)
    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getFruitTypesAnalysisbyTypeId(req,res){

    try {
        let fruit_types_analysis=FruitTypesAnalysis.findAll({
            where:{
                status:1,
                fruit_type_id: req.params.fruit_type_id
            }
        })
        return res.send(fruit_types_analysis)
    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function getFruitTypesAnalysisbyFruitId(req,res){

    try {
        let fruit_types_analysis=FruitTypesAnalysis.findAll({
            where:{
                status:1
            },
            include:[
                { 
                    model:FruitTypes,
                    as:"fruit_type",
                    include:[{
                        model:Fruit,
                        as:"fruit",
                        where:{
                            id: req.params.fruit_id
                        }
                    }]
                }
            ]
        })
        return res.send({fruit_types_analysis})
    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
}

async function updategetFruitTypesAnalysis(req,res) {

    try {

        let fruit_types_analysis = await FruitTypesAnalysis.update(req.body,{
            where: {id : req.params.fruit_types_analysis_id}
        })
        return res.send({fruit_types_analysis:fruit_types_analysis,message:"Analsis de tipo de fruta actualizado."})

    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Error inesperado', error: error});
    }
    
}

async function deleteFruitTypesAnalysis(req,res){

    try {

        let fruit_types_analysis= await FruitTypesAnalysis.update(
            {
                status:0
            },
            {
                where:{
                    id: req.params.fruit_types_analysis_id
            }
        })

        return res.send({fruit_types_analysis:fruit_types_analysis,message:"Analisis de tipo de fruita eliminada."})

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
    saveFruitType,
    getFruitTypes,
    getFruitTypebyId,
    getFruitTypebyFruitId,
    updateFruitType,
    deleteFruitType,
    saveFruitTypeAnalysis,
    getFruitTypesAnalysis,
    getFruitTypesAnalysisbyId,
    getFruitTypesAnalysisbyTypeId,
    getFruitTypesAnalysisbyFruitId,
    updategetFruitTypesAnalysis,
    deleteFruitTypesAnalysis
}