const express = require('express');
const app = express()

const usersRouter = require('./routes');

app.use("/api", usersRouter)

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...')
})