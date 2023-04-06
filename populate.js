const mongoose = require('mongoose');
const databaseConnect = require('./db/connect');
const principlesModel = require('./models/principles');
const principlesData = require('../principlesData.json');
require('dotenv').config() 

const start = () => {
    try {
        databaseConnect(process.env.MONGO_URI);
        principlesModel.deleteMany();
        principlesModel.create(principlesData);
        console.log('post has been successful')
    } catch (error) {
        console.log(error);
    }
}

start();
