const mongoose = require('mongoose');

const reservation = new mongoose.Schema({
    eventName: {
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

module.exports = mongoose.model('Reservation', reservation);