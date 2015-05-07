var _ = require('lodash');
var Models = require('../models'),
    mongoose = require('mongoose');

var braid = {
  list: function(req, res) {
    //check if they have used a query param, or a url param
    if (req.params.braid_id) {
      Models.Braid.findById(req.params.braid_id, req.exclude ).populate(req.populate).exec(function(err, braid){
        console.log(braid)
        if (err) { res.status(400).json({
          'message': err
        })};

        if (!braid) {
          res.status(404).json({
            'message': 'We\'re sorry we can\'t find a braid with that id, please make sure you\'ve spelled it properly'
          });
        } else {
          //we must of found it so, return it to the person requesting it
          res.status(200).json(braid);
        }

      });
    } else if (req.query.username) {
      Models.Braid.find({ _userId: req.query.username }, req.exclude).populate(req.populate).exec(function(err, braids){
        console.log(braids);
        if (err) { res.status(400).json({
          'message': err
        })};

        if (braids.length > 0) {
          //there are more than none which means we found some
          res.status(200).json(braids);
        } else {
          res.status(404).json({
            'message': 'We\'re sorry we can\'t find a braids by that user'
          });
        }
      })
    }
  }
}

module.exports = braid;
