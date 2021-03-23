const fs = require('fs').promises;
const filePath = 'users.json';

module.exports.getUsers = async function(req, res) {
    console.log(req)
    try {
        const contents =  await fs.readFile(filePath, "utf8");
        const users = JSON.parse(contents);
        const data = users.map(item => {
            return {id: item.id, name: item.name, age: item.age}
        })
        res.send(data);
    } catch (err) {
        throw err
    }
};

module.exports.createUser = async function (req, res) {
    try {
        const {name, age} = req.body
        const create_at = Date.now();
        const user = { name, age, create_at }

        const contents = await fs.readFile(filePath, "utf-8")
        const users = JSON.parse(contents)
        const id = Math.max.apply(
            Math,
            users.map(user => user.id)
        )
        user.id = id + 1
        users.push(user)
        const data = JSON.stringify(users)
        await fs.writeFile(filePath, data)
        res.send(user)
    } catch (req) {
        if (!req.body) return res.sendStatus(400)
    }
}