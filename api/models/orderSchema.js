
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let orderSchema = new Schema({
    userid: {
        type: String, 
    },
    cardno: {
        type: String, 
        },

    qty: {
        type: String, 
        default:"1"
    },  
    item: {
        type: String, 
        default:"coffee"
    },
    milk: {
        type: String, 
        default:"no"
        }, 
    price: {
            type: String, 
            default:"1.50"
        }, 
    status: {
        type: String, 
        default:"notdone"
    },
});

module.exports = mongoose.model('Orders', orderSchema);