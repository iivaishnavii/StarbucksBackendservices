var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');

/**
 * A route for user registration
 * @param  {[HTTP Request]} req Incoming HTTP Request
 *                              req.body required fields: pin, email
 * @param  {[JSON]}         res Outgoing HTTP Response
 * @return {[JSON]}             Returns res or err
 */
router.post('/user', function (req, res) {
  User.create(req.body)
    .then(function(dbUser) {
      // If saved successfully, send the the new User document to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

/**
 * A route to get user profile
 * @param  {[HTTP Request]} req Incoming HTTP Request
 *                              /:id =  mongo document _id
 * @param  {[JSON]}         res Outgoing HTTP response
 * @return {[JSON]}             Returns res or err
 */
router.get('/user/:id', function (req, res) {
  User.findOne({ _id: String(req.params.id)}, function(err, data) {
    if (err) {throw err;}
    else {
      let id    = data._id
      let email = data.email
      let phone = (data.phone != undefined) ? data.phone : "No Phone On File"
      res.json({'id': id, 'email': email, 'phone': phone});
    }
  })
});

router.post('/user/authenticate', function(req, res) {
  User.findOneAndReplace({email: req.body.email, pin: req.body.pin},
                         {$set:{authenticated: true}},
                         {new: false},
    (err, doc) => {
      if (err){throw err;}
      console.log(doc);
      res.json({'doc': doc, 'User Authentiated' : true})
    });
});

module.exports = router;
