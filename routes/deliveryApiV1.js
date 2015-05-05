var express = require('express');
    router = express.Router();

//get controllers
var user = require('../controllers/user');
var braid = require('../controllers/braid');
var entry = require('../controllers/entry');
var thread = require('../controllers/thread');
var modifier = require('../controllers/modifier');

router.get('/', function(req,res){
  res.json({'message': 'Using delivery api v1'});
});

router.get('/user/:username', user.list);



module.exports = router;
