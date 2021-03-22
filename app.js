const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const jsonParser = bodyParser.json()
const filePath = "users.json";

app.get("/api/users", function(req, res){

    fs.readFile(filePath,"utf8", function(err, contents) {
        if(err) {
            throw err
        }
        const users = JSON.parse(contents);
        const data = users.map(item => {
            return {id: item.id, name: item.name, age: item.age}
        })
        res.send(data);
    });
});

app.post('/api/users', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)

        const userName = req.body.name
        const userAge = req.body.age
        const create_at = Date.now();
        const user = {name: userName, age: userAge, create_at: create_at}

    fs.readFile(filePath, "utf-8", (err, content) => {
        if (err) { console.log(err) }
            const users = JSON.parse(content)
            const id = Math.max.apply(
                Math,
                users.map(function (o) {
                    return o.id
                })
            )
            user.id = id + 1
            users.push(user)
            const data = JSON.stringify(users)
            console.log(data)
            fs.writeFile(filePath, data, (err) => {
                if (err) { console.log(err) };
                if (data) {
                    res.send(user)
                }
            });

    })
})


app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
})