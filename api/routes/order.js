var express = require('express');
var router = express.Router();

var orders =require('../models/orderSchema');



router.route('/orders').post( function (req, res) {
var price="1.5"
if(req.body.milk==="no")
var price=parseFloat(req.body.qty)*(1.5);
if(req.body.milk==="yes")
var price=parseFloat(req.body.qty)*(2.5);
orders.create( {userid:req.body.userid,
    cardno: req.body.cardno,
    qty: req.body.qty,
    item: req.body.item,
    milk:req.body.milk, 
    price: parseFloat(price), 
    status: req.body.status,
}, function (error,result) {
        if (error) {
          console.log(error.message)
          res.status(400).json("Can't place order sorry!");
        
        } else {
        
        console.log(result)
        res.status(200).json("order placed successfully");
        }
        })
});

router.route('/orders').get( function (req, res) {
    orders.find( {userid:req.query.userid}, function (error,result) {
            if (error) {
              console.log(error,"error")
          
              res.status(400).json("Unable to get orders!");
            } else {
            
                if(JSON.stringify(result)==="[]")
                  {
                    res.status(204).json({ responseMessage: 'Orders for this Not found' });
                  }
                  else{
                    res.status(200).json(JSON.stringify(result)); 
                  }
            }
            })
    });
module.exports = router;