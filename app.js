const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs').promises;

const app = express()
const jsonParser = bodyParser.json()
const filePath = "users.json";

app.get("/api/users", async function(req, res){
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
        const userName = req.body.name
        const userAge = req.body.age
        const create_at = Date.now();
        const user = {name: userName, age: userAge, create_at: create_at}

        const contents = await fs.readFile(filePath, "utf-8")
            const users = JSON.parse(contents)
            const id = Math.max.apply(
                Math,
                users.map(function (o) {
                    return o.id
                })
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