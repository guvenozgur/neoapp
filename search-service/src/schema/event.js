const mongoose = require('mongoose');

const event = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: Number
    },
    status: {
        type: Number
    }
});

event.index({category: 1, status:1});


module.exports = mongoose.model('Event', event);