const usersRouter = require('express').Router();
const { request } = require('../app');
const User = require('../model/user');
const bcrypt = require('bcrypt');


usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({username, name, passwordHash});

    const savedUser = await user.save();

    response.status(201).json(savedUser);

});






module.exports = usersRouter;


