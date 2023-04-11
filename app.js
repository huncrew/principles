// app that lets you store your principles, then enter your current life challenge and area of life that it affects, and it delivers your most 
// poignent principle and suggests a decision for you.
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const principleRoutes = require('./routes/principles');
const authRoutes = require('./routes/auth');
const addToReq = require('./controllers/test');
const databaseConnect = require('./db/connect');
const pageNotFound = require('./middleware/not_found');
const errorHandlingMiddleware = require('./middleware/error_handling');
require('dotenv').config() 
const sendEmail = require('./controllers/email');

//middleware
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(jsonParser);

//testing middleware
app.use(addToReq);

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/principles', principleRoutes);

app.get('/send', sendEmail);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/public', 'index.html'));
});

//middleware errors
app.use(pageNotFound);
app.use(errorHandlingMiddleware);


const start = async () => {
    try {
        const db = await databaseConnect(process.env.MONGO_URI);
        console.log('connection to Database Successful')
        app.listen(5000, () => {
            console.log('server open port 5000')
        })
    } catch (error) {
        console.log(error)
    }
}
start();

