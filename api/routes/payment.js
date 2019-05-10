var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');
var Card = require('../models/cardSchema')

var orders =require('../models/orderSchema');



router.route('/makePayment').post( async function (req, res) {
    console.log("Make payments page");
    let userMail = req.body.email;
    let price =0;
     let ObjectId = require('mongoose').Types.ObjectId;
    let orderid2={orderid:new ObjectId(req.body.orderid)};
    let objectorderid=orderid2.orderid
    let orderid = req.body.orderid;
    console.log(typeof(orderid))
    console.log(typeof(orderid2.orderid))
    let cardNum = req.body.cardNum;
    var minimum_balance=1.50;
     var user_exists ='';
     var card_valid=0;
     var balanceVal = 0;
    
     
    //user id validation
    let does_user_exist = await User.findOne({"email":userMail}).select('email').then((response)=>{
        user_exists = response.email;
        console.log("user exists",user_exists);
    }).catch((err)=>console.log("error at user validation", err))

    //get price from the order table
    let getPriceFromOrders= await orders.findById({objectorderid}).select('price').then((response)=>{
            price = response.price;
            console.log("price is:", price)
        }).catch((err)=>console.log("error at price retrieval",err));
    
        //card number validation
//     if(user_exists){
//    let is_card_num_valid = await Card.findOne({"cardId":cardNum}).select('cardId').then((response)=>{
//         card_valid = response.cardId;
//         console.log("card number is registered",card_valid);
//     }).catch(err=>console.log("error at card validation",err));

//     //get balance from card schema
//     if(card_valid){
//     let balance_val = await Card.findOne({"cardId":cardNum},{"_id":0}).select('balance').then((response)=>{
//         balanceVal = response.balance;
//         console.log("the balance is ",balanceVal);
        
//         if(balanceVal > minimum_balance){
//             balanceVal -= price;
//           let update_balance= await Card.findOneAndUpdate({'cardId':cardNum},{'balance':balanceVal},{useFindAndModify:false}).then((response)=>{
//                 console.log("balance updated");
//          let update_status= await orders.findOneAndUpdate({'cardno':cardNum,'_id':orderid},{'status':"Completed"});
//           let view_new_balance = await Card.find({'cardno':cardNum},{"_id":0}).select('balance').then((response)=>{
//             var newBal = response.balance;
//             console.log("new balance value after update", newBal);
//           })
          
//             res.status(200).json("payment completed");
//             }).catch((err)=>{console.log("error at balance deduction", err)});
//         }
        
//         else{
//             console.log("Insufficient balance for this order");
//            await orders.findOneAndUpdate({'cardno':cardNum,'_id':orderid},{'status':"Rejected"});
//             res.status(400).json("payment rejected");
//         }
//     }).catch((err)=>console.log("error at balance", err));
//     }
// }
});
module.exports = router;