var mongoose = require('mongoose');

// Create a MenuSchema
var MenuSchema = new mongoose.Schema({
	restaurantName: {
		type: String,
		required: true
	},
	menuTitle: {
		type: String,
		required: true
	},
	menuItem: [
				{
					price: Number
					
				,

				
					description: String

				,
				
				
					itemName: String
				,
				
					imageUrl: String,
					
				}


			],
	
});


// Export the model schema

module.exports = MenuSchema;