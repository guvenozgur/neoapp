const mongoose = require('mongoose');


const spot = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    eventName: {
        type: String,
        required: true
    }
});

spot.index({location: 1, eventName: 1}, {unique: true})

module.exports = mongoose.model('Spot', spot);