const mongoose = require('mongoose');

const connectDB = (uri) => {
    mongoose.set('strictQuery', true);
    return mongoose.connect(uri, { 
        serverSelectionTimeoutMS: 1000
    })
}

module.exports = connectDB;