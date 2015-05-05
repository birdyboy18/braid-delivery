//This file sets up the routes for the entire app. By splitting it into their own modules it will be easier to
//create and set up routes as needed as the app may grow, both through features and api versions.
//The function takes the app and then sets up the routes, it works exactly the same as how configure works.

var deliveryApiv1 = require('./routes/deliveryApiV1');
var Inteceptor = require('./middleware/inteceptor');
//use the router i've defined and use the inteceptor middleware I've written to grab query params
module.exports.init = function(app) {
	app.use('/api/delivery/v1/', Inteceptor());
	app.use('/api/delivery/v1/', deliveryApiv1);
}
