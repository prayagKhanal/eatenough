var mongoose = require('mongoose');

// Create a MapProcessSchema
var MapProcessSchema = new mongoose.Schema({
	state: {
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
	}
});


// Export the model schema

module.exports = MapProcessSchema;