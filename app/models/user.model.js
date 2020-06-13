const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let User = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model('users', User);