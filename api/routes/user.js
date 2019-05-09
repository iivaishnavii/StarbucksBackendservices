const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

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
    res.send(data);
  })
});

module.exports = router;
