const Account = require('../models').account;
const User = require('../models').user;


const {mailActivate} = require('../services/utilService')
const sequelize = require('sequelize');
const Op = sequelize.Op;

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @returns {*}
 */
async function index(req, res) {
    let where = { status: 4 };
    let page_size = 25;
    let offset = 0;
    let page = 1;
    // console.log(req.query.length);   
    if(req.query){
        let search = req.query
        if(search){
            page_size = search.length?Number(search.length):10;
            offset = search.start?Number(search.start):0;
        }
    }

    let model = await Account.findAndCountAll({
        attributes: {exclude: ['password']},
        include: [{
            model: User,
            as: "user"
        }],
        where: where,
        offset:offset,
        limit : page_size,
        subQuery:false,
        order: [
            ['createdAt', 'DESC']
        ]
    });

    return res.json({
        "draw":page,
        "count":model.count,
        "filtered":model.count,
        "total":[

        ],
        "fullRecordInfo":true,
        "filters":true,
        data:model.rows});
}

async function save(req, res) {
    await Account.create({
        email: req.body.email,
        password: req.body.password,
        term_cond: req.body.term_cond,
        status: 1,
    }).then(function (result) {
        res.send({account: result});
    }).catch(function (err) {
        res.status(401).send({error: err});
    });
}

async function edit(req, res) {

    let id = req.params.id;
    let account = await Account.findByPk(id);

    res.render("pages/account/edit", {
        "account": account
    });
}

async function update(req, res) {

    const {userId} = req.session.session;

    await Account.update({
        name: req.body.name,
        description: req.body.description,
        abbreviation: req.body.abbreviation,
        updated_by: userId,
        updated_by_name: req.session.username,
        status: req.body.status
    }, {returning: true, where: {id: req.body.id}}).then(function (result) {
        req.flash('success_messages', 'Registro actualizado.');
    }).catch(function (err) {
        req.flash('error_messages', err);
    });

    res.redirect('/accounts');
}

async function remove(req, res) {
    let id = req.params.id;
    const {userId} = req.session.session;
    await Account.update({status: 2, updated_by: userId, updated_by_name: req.session.username},
        {returning: true, where: {id: id}}).then(function (result) {
        req.flash('success_messages', 'Registro eliminado.');
    }).catch(function (err) {
        req.flash('error_messages', err);
    });
    res.redirect('/accounts');
}

async function acceptRequest(req, res) {
    await Account.update({status: 1,account_id: req.body.account_id},
        {returning: true, where: {id: req.body.account_id}}).then(async (result) => {
            // await mailActivate(req.body.account_id);
            res.send({account: result, message: 'Cuenta activada. Se envió un correo con los datos de ingreso.'})
    }).catch(function (err) {
        console.log("error:", err);
        res.status(409).send({error: err});
    });
}

async function denyRequest(req, res) {
    await Account.update({status: 2,},
        {returning: true, where: {id: req.body.account_id}}).then(async (result) => {
            // await mailActivate(req.body.account_id);
            res.send({account: result, message: 'Cuenta desaprobada.'})
    }).catch(function (err) {
        console.log("error:", err);
        res.status(409).send({error: err});
    });
}

async function unsuscribe(req, res) {
    const account = res.locals.account;
    await Account.update({suscribe: 0,motivo_id:req.body.motivo_id,motivo:req.body.motivo},
        {returning: true, where: {id: account.id}}).then(async (result) => {
        // await mailActivate(req.body.account_id);
        res.send({account: result, message: 'Actualizado.'})
    }).catch(function (err) {
        console.log("error:", err);
        res.status(409).send({error: err});
    });
}

module.exports = {index, save, edit, update, remove, acceptRequest, denyRequest, unsuscribe};
