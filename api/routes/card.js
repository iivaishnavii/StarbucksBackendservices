var express = require('express');
var router = express.Router();
var Card = require('../models/cardSchema')
var User = require('../models/userSchema')

router.post('/addCard',function (req, res) {
    User.findOne({'email':req.body.email},(err,user)=>{
        if(err)
        {
            res.writeHead(500,{
                'Content-type' : 'text/plain'
            })
            res.end('Unable to fetch user details '+err)
        }
        console.log('user'+user)
        if(user)
        {
            if(user.cards && user.cards.includes(req.body.cardId))
            {
                res.writeHead(500,{
                    'Content-type' : 'text/plain'
                })
                res.end('Card already exists '+user)
            }
            else
            { 
                console.log(req.body.cardId)
                if(req.body.cardId.length!=9)
                {
                    res.writeHead(500,{
                        'Content-type' : 'text/plain'
                    })
                    res.end('Cardid should be 9 digits long')
                }
                if(req.body.cardCode.length!=3)
                {
                    res.writeHead(500,{
                        'Content-type' : 'text/plain'
                    })
                    res.end('Card code should be 3 digits long')

                }
                user.card.push(req.body.cardId)
                var cardItem =new Card ({
                    cardId : req.body.cardId,
                    cardCode : req.body.cardCode,
                    balance : '20',
                    email :req.body.email
                })
        
            cardItem.save()
            .then(response=> {
               res.writeHead(200,{'Content-Type': 'text/plain'});
               res.end('created a card Successfully')
               
            })
            .catch(err=>{
                res.writeHead(500,{
                    'Content-type' : 'text/plain'
                })
                res.end('Unable to add a card '+err)               
            })
            }
           
        }
        else
        {
            console.log("length of card id "+req.body.cardId.toString().length)
            if(req.body.cardId.toString().length!=9)
            {
                res.writeHead(500,{
                    'Content-type' : 'text/plain'
                })
                res.end('Cardid should be 9 digits long')
            }
            if(req.body.cardCode.toString().length!=3)
            {
                res.writeHead(500,{
                    'Content-type' : 'text/plain'
                })
                res.end('Card code should be 3 digits long')

            }
            else
            {
                var cardItem =new Card ({
                    cardId : req.body.cardId,
                    cardCode : req.body.cardCode,
                    balance : '20',
                    email :req.body.email
                })
            
                cardItem.save()
                .then(response=> {
                   res.writeHead(200,{'Content-Type': 'text/plain'});
                   res.end('created a card Successfully')
                   
                })
                .catch(err=>{
                    res.writeHead(500,{
                        'Content-type' : 'text/plain'
                    })
                    res.end('Unable to add a card '+err)               
                })
            }
            
        }
       
   })
   
 })
 module.exports = router;