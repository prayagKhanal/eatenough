var mongoose = require('mongoose');

// Create a MenuCourseSchema
var MenuCourseSchema = new mongoose.Schema({
	restaurantName: {
		type: String,
		required: true
	},
	courseName: {
		type: String,
		required: true
	},
	courseOrder:{
		type: Number,
		required: true
	}
	
});


// Export the model schema

module.exports = MenuCourseSchema;