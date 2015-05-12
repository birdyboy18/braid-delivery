var _ = require('lodash');
var Models = require('../models'),
    mongoose = require('mongoose'),
    utils = require('../helpers/utils');


var entry = {
  listById: function(req, res) {
    Models.Entry.findById(req.params.entry_id, req.exclude).populate(req.populate).exec(function(err, entry){
      if (err) { res.status(400).json({
          'message': err
        })};

      if (!entry) {
        res.status(404).json({
            'message': 'Sorry we can\'t find an entry with that id'
          });
      } else {
        res.status(200).json(entry);
      }
    });
  },
  listByParam: function(req, res) {
    if (req.query.braidId) {
      Models.Entry.find({ _braidId: req.query.braidId }, req.exclude).populate(req.populate).skip(req.skip).limit(req.limit).exec(function(err, entries){
        if (err) { res.status(400).json({
          'message': err
        })};

        if (entries.length > 0) {
          //found em
          res.status(200).json(entries);
        } else {
          res.status(404).json({
            'message': 'We\'re sorry we can\'t find any entries by that braidId'
          });
        }
      })
    } else if (req.query.threadId) {
      Models.Entry.find({ _threadId: req.query.threadId }, req.exclude).populate(req.populate).skip(req.skip).limit(req.limit).exec(function(err, entries){
        if (err) { res.status(400).json({
          'message': err
        })};

        if (entries.length > 0) {
          //found em
          res.status(200).json(entries);
        } else {
          res.status(404).json({
            'message': 'We\'re sorry we can\'t find any entries by that threadId'
          });
        }
      })
    } else {
      res.status(400).json({
        'message': 'You haven\'t provided any parameters to search by'
      })
    }
  },
  listByModifier: function(req, res) {
    //set the modifier and term up ready for the searches
    var modifier = 'modifiers.' + req.params.modifier_slug + '.terms';
      var term = req.params.term;
    if (req.query.braidId) {
      var query = Models.Entry.find({}, req.exclude).where('_braidId').equals(req.query.braidId).where(modifier).equals(term);

      query.populate(req.populate).skip(req.skip).limit(req.limit).exec(function(err, entries){
        if (err) { res.status(400).json({
          'message': err
        })};

        res.status(200).json(entries);
      });
    } else if (req.query.threadId) {
      var query = Models.Entry.find({}, req.exclude).where('_threadId').equals(req.query.threadId).where(modifier).equals(term);

      query.populate(req.populate).skip(req.skip).limit(req.limit).exec(function(err, entries){
        if (err) { res.status(400).json({
          'message': err
        })};

        res.status(200).json(entries);
      });
    }
  }
}

module.exports = entry;

/*
dynamic routing for entires can be as followed
1. grab entries by thread_id or by username
2. 
*/