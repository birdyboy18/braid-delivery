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

//list the resources that a user has, only if they have the right username
router.get('/user/:username', user.list);

//get a braid resource using a query params, in this case provide a username param
router.get('/braid/', braid.list);
//List a braid resource using it's id
router.get('/braid/:braid_id', braid.list);

//grab a thread based on username, braid_id, or by service.
router.get('/thread/', thread.listByParam);
router.get('/thread/:thread_id/', thread.listById);

//grab modifiers based on paramaters
router.get('/modifier/', modifier.listByParam);
router.get('/modifier/:mod_id', modifier.listById);

//grab entries, this is probably where the routes become most important. Being able to filter and sort.
router.get('/entries/:entry_id', entry.listById);
router.get('/entries/', entry.listByParam);
router.get('/entries/:modifier_slug/:term', entry.listByModifier);



module.exports = router;
