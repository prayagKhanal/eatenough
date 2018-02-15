var mongoose = require('mongoose');

// Create a RestaurantSchema
var RestaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	street: {
		type: String,
		required: true
	},
	logo:{
		type: String,
		required:true
	},
	banner:{
		type: String,
		required:true
	},
	zip:{
		type: Number,
		required:true
	},
	rating:{
		type: Number,
		required:true
	},
	delivery_time:{
		type: Number,
		required:true
	},
	state:{
		type: String,
		required:true
	},
	loc: {
    type: [Number],   // [<longitude>, <latitude>]
    index: '2d'   // create the geospatial index
	}

});


// Export the model schema

module.exports = RestaurantSchema;
// module.exports = mongoose.model('Restaurant',RestaurantSchema);