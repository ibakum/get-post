const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const users_controller = require('../controllers/usersControllers');

usersRouter.use(function (req, res, next) {
    console.log(req.path, Date.now());
    next();
});

usersRouter.get("/users", users_controller.getUsers);
usersRouter.post('/users', jsonParser, users_controller.createUser);

module.exports = usersRouter;