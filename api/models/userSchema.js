var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    pin: {
        type: String, 
    },
    email: {
        type: String, 
        },

    phone: {
        type: String, 
        },  
    card: {
        type: Array, 

    },

});

module.exports = mongoose.model('User', userSchema);