const User = require('../models').user;
const Account = require('../models').account;
const sequelize = require('sequelize');
const Op = sequelize.Op;


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

async function getUserProfile (req,res){
    const account_id = req.params.account_id;
    const {id} = res.locals.account;
    const tmpAccount_id = (account_id? account_id : id);

    try {

        let userProfile = await Account.findByPk(tmpAccount_id,{
            attributes : ['id','email','role'],
            include : [{
                model:User,
                as : 'user'
            }]
        })

         return res.send({profile: userProfile});

    } catch (error) {
        return res.status(409).send({message: 'Error inesperado', error: error});
    }   


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

async function accountUserEdit(req, res) {
    const account_id = req.params.account_id;
    try {

        await User.update(req.body, {returning: true, where: {account_id: account_id}});

        const account = await Account.findByPk(account_id,{
            attributes: {exclude: ['password']},
            include: [{
                model: User,
                as: "user"
            }],
        });

        return res.send({user: account});

    }catch (error) {
        return res.status(409).send({message: 'Error inesperado',error: error});
    }
}



module.exports = {
        index,
        save,
        accountUserEdit,
        getUserProfile
    };
