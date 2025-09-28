const usersRouter = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');


usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (!password) {
        response.status(400).json({ error: 'password is required' });
        return;
    }

    if (password.length < 3) {
        response.status(400).json({ error: 'password must be at least 3 characters long' });
        return;
    }



    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, passwordHash });

    try {
        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        if (error.message.includes('E11000')) {
            response.status(400).json({ error: 'username must be unique' });
            return;
        }
        response.status(400).json({ error: error.message });
    }


});






module.exports = usersRouter;


