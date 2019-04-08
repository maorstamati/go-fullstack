// MONGODB PW: dGS9NtcdO8H6IFVV
// MONGODB CONNECTION: mongodb+srv://Maor:<password>@cluster0-rdaxc.mongodb.net/test?retryWrites=true

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

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

app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    console.log(thing);
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.use('/api/stuff', (req,res,next) => {
    const stuff = [
        {
            _id: 'dsjkfhasjklf',
            title: 'My first thing',
            description: 'My first great thing',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/%C5%A0eduvos_RKB_1844-1850_prie%C5%A1santuokin%C4%97s_apklausos_knyga_097.jpg',
            price: 4900,
            userId: 'sdfjkghq3784ty'
        },
        {
            _id: 'dsjkfhasjk11',
            title: 'My second thing',
            description: 'My second great thing',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Starr-050208-3926-Prosopis_pallida-habitat-North_coast-Kahoolawe_%2824369072199%29.jpg',
            price: 5100,
            userId: 'sdfjkghq3784ty'
        }
    ];
    res.status(200).json(stuff);
});

module.exports = app;