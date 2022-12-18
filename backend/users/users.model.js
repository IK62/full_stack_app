const mongoose = require('mongoose')

module.exports = mongoose.model('users', mongoose.Schema({
    username: {
        type: String,
        max: 20,
        min: 3,
        required: true,
    },
    email: {
        type: String,
        max: 45,
        min: 10,
        required: true,
    },
    password: {
        type: String,
        max: 23,
        min: 5,
        required: true,
    }
}))