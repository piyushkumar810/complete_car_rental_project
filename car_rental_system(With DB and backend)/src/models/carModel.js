require("dotenv").config();
const mongoose = require("mongoose");


(async function () {

  const mongoose = require('mongoose');

  // Define the car schema
  const carSchema = new mongoose.Schema({
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    modelName: {
      type: String,
      required: true,
      trim: true,
    },
    mileage: {
      type: Number,
      required: true,
      min: 0,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 2000,
    },
    car_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dateListed: {
      type: Date,
      default: Date.now,
    },
    features: {
      type: [String],
    },
    description: {
      type: [String],
      default: "We're really sorry for the inconvience ....! The description for this car is not available at the moment"

    }
  });

  // Create the model from the schema
  const Car = mongoose.model('Car', carSchema);

  // Export the model
  module.exports = Car;
})();