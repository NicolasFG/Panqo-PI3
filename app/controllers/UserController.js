const User = require('../models').user;
const Account = require('../models').account;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const bcrypt = require('bcrypt');
const { subAccountUserSave,
        subAccountUserUpdate,
        subAccountUserDelete,
        subAccountUsersDelete,
    } =  require('../services/userService')


/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @returns {*}
 */
async function index(req, res) {
    let users = await User.findAll({
        where: {status: {[Op.not]: 2}}
    });
    res.send({users: users})
}

async function save(req, res) {

    const {id} = res.locals.account;
    let body = req.body;
    body.account_id = id;
    try {
      
        let user = await User.findOne({
            where: {
                account_id: id
            }
        });
        if(user) {
            user = await user.update(body);
        }else{
            user = await User.create(body);
        }
        return res.send({user: user});
    }catch (error) {
        return res.status(409).send({message: 'Error inesperado',error: error});
    }

}

async function edit(req, res) {

    let id = req.params.id;
    let user = await User.findByPk(id);

    return res.send({user: user});
}

async function update(req, res) {

    const {userId} = req.session.session;

    await User.update({
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

    res.redirect('/users');
}

async function remove(req, res) {
    let id = req.params.id;
    const {userId} = req.session.session;
    await User.update({status: 2, updated_by: userId, updated_by_name: req.session.username},
        {returning: true, where: {id: id}}).then(function (result) {
        req.flash('success_messages', 'Registro eliminado.');
    }).catch(function (err) {
        req.flash('error_messages', err);
    });
    res.redirect('/users');
}

async function accountUserSave(req, res) {
    const {id} = res.locals.account;
    if (await Account.findOne({where: {email: req.body.email}})) {
        return res.status(401).send({message: "La cuenta ya se encuentra registrada"});
    } else {
        const dataAccount = await subAccountUserSave(req.body, id);
        return res.send(dataAccount);
    }
}

async function accountUserEdit(req, res) {
    const account_id = req.params.account_id;
    const dataAccount = await subAccountUserUpdate(req.body, account_id);
    if(dataAccount){
        return res.send(dataAccount);
    }
    return res.status(409).send({message: 'Error inesperado',error: 'f'});
}

async function accountUserDelete(req, res) {
    const {id} = res.locals.account;
    const account_id = req.params.account_id;
    let account_admin = await Account.findByPk(id);
    if (account_admin && req.body.password) {
        if (await bcrypt.compare(req.body.password, account_admin.password)) {

            const dataAccount = await subAccountUserDelete(account_id);
            if(dataAccount){
                return res.send({message: dataAccount});
            }
            return res.status(409).send({message: 'Error inesperado',error: 'f'});
        }
        return res.status(401).send({message: "No autorizado"});
    }
    else {
        return res.status(401).send({message: "No autorizado"});
    }
}


async function accountManyUserDelete (req,res){
    const {id} = res.locals.account;
    let account_admin = await Account.findByPk(id);
    if (account_admin && req.body.password) {
        if (await bcrypt.compare(req.body.password, account_admin.password)) {
                let delResult= await subAccountUsersDelete(req.body.users);
                return res.send(delResult);
        }
        return res.status(401).send({message: "No autorizado"});
    }
    else {
        return res.status(401).send({message: "No autorizado"});
    }
}

async function accountUsers(req, res) {
    const {id} = res.locals.account;


    let where = { status: 1, account_id: id };
    let page_size = 25;
    let offset = 0;
    let page = 1
    if(req.query){
        let search = req.query;
        if(search){
            page_size = search.length?Number(search.length):10;
            offset = search.start?Number(search.start):0;
        }
    }

    let model = await Account.findAndCountAll({
        attributes: ['email', 'status','account_id','role','createdAt','id'],
        include: [
            {
                model: User,
                as: 'user'
            }
        ],
        where: where,
        offset:offset,
        limit : page_size,
        subQuery:false,
        order: [
            ['id', 'ASC'],
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



async function getUserProfile (req,res){

    const account_id = req.params.account_id;
    const {id} = res.locals.account;
    const tmpAccount_id = (account_id? account_id : id);

    try {

        let userProfile = await Account.findByPk(tmpAccount_id,{
            attributes : ['id','email','role','razon_social'],
            include :[
                {
                    model: User,
                    as: 'user',
                    include :[
                        {
                            model : Civil,
                            as: 'civil'
                        },
                        {
                            model : District,
                            as : 'district'
                        },
                        {
                            model : Province,
                            as : 'province'
                        },
                        {
                            model : Department,
                            as : 'department'
                        }
                    ]
                },
                {
                    model : Job,
                    as :'job',
                    include:[
                        {
                            model: Attrition,
                            as:'attrition'
                        },
                        {
                            model : JobLevel,
                            as : 'job_level'
                        },
                        {
                            model: Rubro,
                            as : 'rubro'
                        }
                    ],
                    offset: 0,
                    limit: 1,
                    order: [
                        ['from_year', 'DESC'],
                    ]    
                
                },
                {
                    model : Education,
                    as: 'education',
                    include :[
                       {
                           model: Level,
                           as :'level'
                       },
                       {
                           model: Field,
                           as :'field'
                       }
                    ]   
                }
            ]
        });
        return res.send({profile: userProfile});

    } catch (error) {
        
        return res.status(409).send({message: 'Error inesperado', error: error});
    }
}

async function changePassword (req, res) {
    
    const {id} = res.locals.account;
    if(!req.body.old_password){
     return res.status(409).send({message: 'Password anterior es obligatorio'});   
    }
    if(req.body.new_password!==req.body.new_password_confirmed){
     return res.status(409).send({message: 'Passwords no coinciden'});   
    }
     let account = await Account.findOne(
        {
            where: {id: id},
            attributes: ['id','password'],
        }
        );
     if (await bcrypt.compare(req.body.old_password, account.password)) {
        let hash_pass = await bcrypt.hash(req.body.new_password, 12);
        await account.update({password: hash_pass});
        return res.send({message: "Password actualizado correctamente."});

     }else{
        return res.status(409).send({message: 'Password anterior no es correcto.'});      
     }
}


module.exports = {
        index,
        save,
        edit,
        update,
        remove,
        accountUserSave,
        accountUserEdit, 
        accountUserDelete,
        accountManyUserDelete,
        accountUsers,
        getUserProfile,
        changePassword
    };
