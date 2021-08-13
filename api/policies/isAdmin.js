module.exports = function(req, res, next) {
  var action = req.options.action;
  var controller = req.options.controller;
  if(req.token.isAdmin){
    return next();
  }
  else{
  	return res.json(401, {
      err: 'Unauthorized'
  	});
  }
};
