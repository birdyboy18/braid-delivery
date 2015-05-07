/*
This is a middleware that will intecept all the query params that get sent over in a get request, 
if the request query parameters have an exclude parameter then it will be sure to exclude those and pass it over in a req.exclude.

If it has a populate param then everything than can be populated will be.
*/
var _ = require('lodash');

var Inteceptor = function() {
	return function(req,res,next) {
		//if the exlude query is included get them ready for the query.
		if (req.query.exclude) {
			//turn the string into an array;
			var excludeArray = req.query.exclude.split(" ");
			//set some defaults, this stuff is personal
			var returnString = '';
			excludeArray.map(function(param){
				param = '-' + param;
				returnString += param + ' ';
			});
			req.exclude = returnString;
		}
		//if the populate field is there then populate the fields you want populating
		if (req.query.populate) {
			req.populate = req.query.populate;
		} else {
			req.populate = '';
		}
		//count how many params there are
		req.paramLength = _.size(req.query);

		//we need to be able to intecept for params for limiting and skipping, that way we can easily paginate results
		if (req.query.limit) {
			req.limit = req.query.limit;
		} else {
			req.limit = '';
		}

		if (req.query.skip) {
			req.skip = req.query.skip;
		} else {
			req.skip = '';
		}
		next();
	}
};

module.exports = Inteceptor;