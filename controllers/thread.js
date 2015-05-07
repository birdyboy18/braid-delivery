var _ = require('lodash');
var Models = require('../models'),
    mongoose = require('mongoose');

var thread = {
  listById: function(req, res) {
    if (req.params.thread_id) {
      Models.Thread.findById(req.params.thread_id, req.exclude).populate(req.populate).exec(function(err, thread){
        if (err) { res.status(400).json({
          'message': err
        })};

        if (!thread) {
          res.status(404).json({
            'message': 'Sorry we can\'t find a thread with that id'
          });
        } else {
          res.status(200).json(thread);
        }
      })
    } else {
      res.status(400).json({
        'message': 'you haven\'t supplied a thread Id' 
      });
    }
  },
  listByParam: function(req, res) {
    if (req.query.username && req.query.braidId) {
      res.status(400).json({
        'message': 'You don\'t need to supply both a username and braid_id, please only pick one to query by'
      });
    } else if (req.query.braidId) {
      Models.Thread.find({ _braidId: req.query.braidId }, req.exclude).populate(req.populate).exec(function(err, threads){
        if (err) { res.status(400).json({
          'message': err
        })};

        if (threads.length > 0) {
          //we found it so just return the array of threads
          res.status(200).json(threads);
        } else {
          res.status(404).json({
            'message': 'We\'re sorry we can\'t find any threads in that braid'
          });
        }
      });
    } else if (req.query.username) {
      Models.Thread.find({ _userId: req.query.username }, req.exclude).populate(req.populate).exec(function(err, threads){
        if (err) { res.status(400).json({
          'message': err
        })};

        if (threads.length > 0) {
          //we found it so just return the array of threads
          res.status(200).json(threads);
        } else {
          res.status(404).json({
            'message': 'We\'re sorry we can\'t find any threads by that user'
          });
        }
      });
    } else if (req.query.service) {
      Models.Thread.find({ service: req.query.service }, req.exclude).populate(req.populate).exec(function(err, threads){
        if (err) { res.status(400).json({
          'message': err
        })};

        if (threads.length > 0) {
          //we found it so just return the array of threads
          res.status(200).json(threads);
        } else {
          res.status(404).json({
            'message': 'We\'re sorry we can\'t find any threads by that service'
          });
        }
      });
    }
  }
}

module.exports = thread;
