"use strict"

const mongoose = require('mongoose');

const payment = new mongoose.Schema({
    evetName: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    spot: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Payment', payment);