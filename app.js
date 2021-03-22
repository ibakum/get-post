const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs').promises;

const app = express()
const jsonParser = bodyParser.json()
const filePath = "users.json";

// Express Middleware
app.get("/api/users", function(req, res, next) {
    const date = Date.now()
    console.log(req.path, date);
    next();
    }, async function(req, res, next){
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
});

app.post('/api/users', jsonParser, async function (req, res) {
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
})

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
})