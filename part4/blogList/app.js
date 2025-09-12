const express = require('express');
const mongoose = require('mongoose');

// local imports
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controller/blogs');
const usersRouter = require('./controller/users');


const app = express();

// connect to MongoDB
logger.info('connecting to MongoDB');
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('successfully connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message);
    });


// Middlewares
// app.use(express.static('dist'));
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

// export app
module.exports = app;






