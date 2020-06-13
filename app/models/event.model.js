const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
    title:{
        type:String,
        required : true,
    },
    uid:{
        type:String,
        required : true,
    },
    date:{
        type: Date,
        required : true,
    },
    description :{
        type:String,
    },
    banner_image:{
        type:String,
    },
    created_at:{
        type: Date
    },
    updated_at:{
        type: Date
    }
})

module.exports = mongoose.model('events', Event );
