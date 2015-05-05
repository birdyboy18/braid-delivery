/*
This is a middleware that will intecept all the query params that get sent over in a get request, 
if the request query parameters have an exclude parameter then it will be sure to exclude those and pass it over in a req.exclude.

If it has a populate param then everything than can be populated will be.
*/


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
		if (req.query.populate != '') {
			req.populate = req.query.populate;
		} else {
			req.populate = '';
		}
		next();
	}
};

module.exports = Inteceptor;