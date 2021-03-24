const Sequelize = require("sequelize");
const sequelize = new Sequelize("users", "postgres", "user", {
    dialect: "postgres",
    host: "localhost"
});

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

module.exports.getUsers = async function(req, res) {
    try {
        const data = await User.findAll({raw:true})
        res.send(data);
    } catch (err) {
        throw err
    }
};

module.exports.createUser = async function(req, res) {
    try {
        console.log(req)
        const user = await User.create({
            id: req.query.id,
            name: req.body.name,
            age: req.body.age
        })
        res.send(user)
    } catch (req) {
        if (!req.body) return res.sendStatus(400)
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