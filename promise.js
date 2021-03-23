const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs').promises;

const app = express()
const jsonParser = bodyParser.json()
const filePath = "users.json";

// Express Middleware
app.use(function (req, res, next) {
    console.log(req.path, Date.now());
    next();
});

app.get("/api/users", function(req, res) {
        fs.readFile(filePath, "utf8")
        .then((contents) => {
            // console.log(typeof contents)
            const users = JSON.parse(contents);
            console.log(users)
            const data = users.map(item => {
                return {id: item.id, name: item.name, age: item.age}
            })
            console.log(data)
            res.send(data);
        }).catch((err) => {
            throw err
        })
});

app.post('/api/users', jsonParser, function (req, res) {
    const {name, age} = req.body
    const create_at = Date.now();
    const user = { name, age, create_at }

    fs.readFile(filePath, "utf-8")
        .then((contents) => {
            const users = JSON.parse(contents)
            const id = Math.max.apply(
                Math,
                users.map(user => user.id)
            )
            user.id = id + 1
            users.push(user)
            return JSON.stringify(users)
        })
        .then((data) => {
            fs.writeFile(filePath, data)
                .then(()=> {
                    console.log(user)
                    res.send(user)
                })
                .catch((err)=> {
                    throw err
                })
        })
        .catch((req)=> {
            if (!req.body) return res.sendStatus(400)
        })
})

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
})