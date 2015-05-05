//To keep the server lighweight make a configure module
//that takes the app and then returns the app with all the config set up

var path = require('path');
var routes = require('../routes');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var mongoose = require('mongoose');
var cors = require('cors');
var config = require('../config.js');

module.exports = function(app) {
  app.use(cors());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(methodOverride());

  //init the routes
  routes.init(app);
  //connect to the database
  var options = {
    user: config.db.user,
    pass: config.db.pass
  }
  mongoose.connect('mongodb://localhost/braid', options);
  mongoose.connection.on('open', function(err){
    if (err) throw err;

    console.log("Succesfully connected to database");
  });
  if ('development' === app.get('env')) {
    app.use(errorHandler());
    app.set('json spaces', 2);
  }

  return app;
}
