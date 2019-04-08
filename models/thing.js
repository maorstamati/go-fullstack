const mongoose = require('mongoose');

//Define the thingSchema with all the fields belong to Thing
const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    price: {type: String, required: true},
    userId: {type: String, required: true},
});

//Export the module in order to be able to import in app. thingSchema will be enforced.
module.exports = mongoose.model('Thing', thingSchema);