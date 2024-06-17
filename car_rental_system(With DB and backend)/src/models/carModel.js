require("dotenv").config();
const mongoose = require("mongoose");

// ***************** Time Conversion **********
function convertISTtoUTC(date) {
  const istOffset = 5.5 * 60; // IST is UTC + 5:30
  const utcDate = new Date(date.getTime() - (istOffset * 60 * 1000));
  return utcDate;
}


const carSchema = new mongoose.Schema({
  name: {
    type: String,
    lowerCase: true,
    trim: true,
    required: true
  },
  manufacturer: {
    type: String,
    trim: true,
    required: true,
    lowerCase: true
  },
  modelName: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true
  },
  mileage: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true
  },
  dateListed: {
    type: Date,
    default: function () {
      // Get current date and time in IST
      const currentDateIST = new Date();
      // Convert to UTC
      return convertISTtoUTC(currentDateIST);
    }
  },
  no_of_seats: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    trim: true,
    lowerCase: true
  },
  price: {
    type: Number,
    required: true,
    min: 200
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    default: "We're really sorry for the inconvience ...! The Description of this car is not available at the moment"
  },
  launchedDate: {
    type: Date
  }
});



const Car = new mongoose.model("Car", carSchema);

module.exports = Car;
