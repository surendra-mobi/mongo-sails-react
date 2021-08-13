module.exports = function(req, res, next) {
    if (req.get('access_token')) {
      token = req.get('access_token');
      jwToken.verify(token, function(err, token) { console.log(token);
        if (err) return res.json(401, {
          err: 'Invalid Token!'
        });
        req.token = token;
        req.decoded = {};
        req.decoded.userId = token.id; // This is the decrypted token or the payload you provided
        console.log(req.decoded);
        next();
      });
    } 
    else {
      return res.json(401, {
        err: 'No Authorization header was found'
      });
    }
};
