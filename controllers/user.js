var _ = require('lodash');
var Models = require('../models');

var user = {
  list: function(req, res) {
    Models.User.findOne({ username: req.params.username }, req.exclude).populate(req.populate).exec(function(err, user){
      if (err) { res.status(400).json({
        'message': err
      })};

      //we must of found it, just return the user and all their data.
      res.status(200).json(user);
    });
  }
}

module.exports = user;
