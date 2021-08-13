/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

const jwt = require('jsonwebtoken');

// Generates a token from supplied payload
module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    sails.config.jwt_secret, // Token Secret that we sign it with
    {
      expiresIn : 604800 // Token Expire time
    }
  );
};

// Verifies token on a request
module.exports.verify = function(token, callback) { console.log("jw"); console.log("jw", token)
  return jwt.verify(
    token, // The token to be verified
    sails.config.jwt_secret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};
