const mongoose = require('mongoose');

const eventDetail = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    availableCapacity: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('EventDetail', eventDetail);