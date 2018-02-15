var restful = require('node-restful');

var mongoose = require('mongoose');
var RestaurantSchema = require('../models/Restaurant'); 
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);



module.exports=function(app,route){

	// Setup the controller for REST.
	var rest = restful.model(
		'mapprocess',
		app.models.mapprocess).
	methods(['get','put','post','delete']);

		





	rest.before('post', hash_password)
  .before('put', hash_password);



function hash_password(req, res, next) {res.end();
	// res.end= function(){ return true }; 	
	var state = req.body.state;
	var city = req.body.city.trim();
	var street = req.body.street;
	console.log(req.body.state);
Restaurant.find( { city: city },'name', function(err, result) {
  	console.log(city);

   if (err) {return handleError(err);}
   else{

res.json({"name":result});
}

  });

	
  // res.send("testsent");
   next();

}
	  // Register this endpoint with the application
	rest.register(app,route);




	// Return Milldeware
	return function(req,res,next){
		
		next();
	};

};