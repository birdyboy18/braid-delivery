var _ = require('lodash');
var Models = require('../models'),
    mongoose = require('mongoose');

var modifier = {
  listById: function(req, res) {
    Models.Modifier.findById( req.params.mod_id, req.exclude).populate(req.populate).exec(function(err, mod){
      if (err) { res.status(400).json({
          'message': err
        })};

      if (!mod) {
          res.status(404).json({
            'message': 'Sorry we can\'t find a modifier with that id'
          });
        } else {
          res.status(200).json(mod);
        }
    });
  },
  listByParam: function(req, res) {
    if (req.query.username) {
      Models.Modifier.find({ _userId: req.query.username }, req.exclude).populate(req.populate).exec(function(err, mods){
        if (err) { res.status(400).json({
          'message': err
        })};

        if (mods.length > 0) {
          //then we found some return then
          res.status(200).json(mods);
        } else {
          res.status(404).json({
            'message': 'We\'re sorry we can\'t find any modifiers by that username'
          });
        }
      });
    }
  }
}

module.exports = modifier;
