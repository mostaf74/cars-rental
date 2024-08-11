const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const CarSchema = new mongoose.Schema({
    carMake: { type: String, required: true },
    carModel: { type: String, required: true },
    carPrice: { type: Number, required: true },
    carImage: { type: String, required: true }  // Storing the image filename or path
  });



// Create the  model
const Car = mongoose.model('car', CarSchema);

module.exports = Car;