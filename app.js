// MONGODB PW: dGS9NtcdO8H6IFVV
// MONGODB CONNECTION: mongodb+srv://Maor:<password>@cluster0-rdaxc.mongodb.net/test?retryWrites=true

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://Maor:dGS9NtcdO8H6IFVV@cluster0-rdaxc.mongodb.net/test?retryWrites=true').
then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
}).
catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

/*
 CORS stands for Cross Origin Resource Sharing. It is a standard that allows us to relax default security rules
 which prevent HTTP calls from being made between different servers. In our case, we have two origins: localhost:3000
 and localhost:4200, and we would like them to be able to communicate with each other.  For this, we need to add some
 headers to our response object.
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //Any request from any origin is allowed, often the case if we want to build a REST-API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //All these headers are allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //All these types of requests are allowed
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;
