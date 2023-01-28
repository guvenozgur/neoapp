"use strict"

const express = require('express');
const app = express();
const server = require('http').Server(app);
const config = require('./config/config');

const PORT = process.env.PORT || config.SERVER_PORT;


const mongoose = require('mongoose');


const controller = require('./controller/controller');


process.on('uncaughtException', (err) => {
    console.error('>>> Unhandled Exception', err)
});

process.on('uncaughtRejection', (err, promise) => {
    console.error('>>> Unhandled Rejection', err)
});


(async function initialize (){

    await initMongo(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));

    app.use('/', controller());
    

}());



async function initMongo(app){
    return new Promise((resolve, reject)=>{
        mongoose.connect(config.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        const db = mongoose.connection;
        app.on('close', () => {
            db.disconnect()
        })
        db.on('error', (err) => {
            console.log(err);
            reject();
        })
        db.on('open', () => {
            console.log('Mongo db connected');
            resolve();
        })

    })
};


server.listen(PORT);
