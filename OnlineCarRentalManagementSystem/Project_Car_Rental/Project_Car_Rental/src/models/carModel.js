
const Unique = require("faker/lib/unique");
const mongoose = require("mongoose");

function convertISTtoUTC(date) {
  const istOffset = 5.5 * 60; // IST is UTC + 5:30
  const utcDate = new Date(date.getTime() - (istOffset * 60 * 1000));
  return utcDate;
}


const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true },
  bodyType: { type: String, required: true },
  engineType: { type: String, required: true },
  transmissionType: { type: String, required: true },
  fuelEfficiency: { type: Number, required: true },
  numberOfSeats: { type: Number, required: true },
  color: { type: String, required: true },
  dailyRentalRate: { type: Number, required: true },
  weeklyRentalRate: { type: Number, required: true },
  monthlyRentalRate: { type: Number, required: true },
  availabilityStatus: { type: String, enum: ['Available', 'Rented', 'Under Maintenance'], required: true },
  location: { type: String, required: true },
  gpsIncluded: { type: Boolean, default: false },
  airConditioning: { type: Boolean, default: false },
  bluetoothConnectivity: { type: Boolean, default: false },
  infotainmentSystem: { type: Boolean, default: false },
  additionalFeatures: { type: String },
  policyNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  registrationNumber: { type: String, required: true,unique:true },
  lastInspectionDate: { type: Date, required: true },
  nextInspectionDate: { type: Date, required: true },
  exteriorPhotos: [{ type: String }],
  interiorPhotos: [{ type: String }],
  currentMileage: { type: Number, required: true },
  serviceHistory: { type: String },
  damageDetails: { type: String },
  notes: { type: String }
});
const carModel = new mongoose.model("carModel", carSchema);
module.exports = carModel;