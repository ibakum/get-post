const Sequelize = require("sequelize");
const sequelize = new Sequelize("users", "postgres", "user", {
    dialect: "postgres",
    host: "localhost"
});
const Joi = require('joi');

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports.getUsers = async function (req, res) {
    try {
        const data = await User.findAll({raw: true})
        res.send(data);
    } catch (err) {
        return Error(res);
    }
};

function Error(response) {
    return response.status(500).json({
        message: 'server error'
    })
}

module.exports.createUser = async function (req, res) {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            age: Joi.number()
        });
        const {value: {name, age}, error} = schema.validate(req.body);
        console.log(error)
        if (error) {
           return res.status(422).json({
                message: 'Invalid request',
                data: error
            })
        }
        const user = await User.create({
            name: name,
            age: age
        })
        return res.send(user)

    } catch (err) {
        return Error(res)
    }
}


// User.findAll({where:{name: "Tom"}, raw: true })
//     .then(users=>{
//         console.log(users);
//     }).catch(err=>console.log(err));
//
// User.findByPk(2)
//     .then(user=>{
//         if(!user) return; // если пользователь не найден
//         console.log(user.name);
//     }).catch(err=>console.log(err));
//
// User.update({ age: 36 }, {
//     where: {
//         name: "Bob"
//     }
// }).then((res) => {
//     console.log(res);
// });
//
// User.destroy({
//     where: {
//         name: "Bob"
//     }
// }).then((res) => {
//     console.log(res);
// });