const fs = require('fs');
const faker = require('faker');

const carData = [];
const registrationNumbers = new Set();

const availabilityStatuses = ['Available', 'Rented', 'Under Maintenance'];
const bodyTypes = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible', 'Truck', 'Van', 'Wagon'];
const engineTypes = ['Inline-4', 'V6', 'V8', 'Electric', 'Hybrid'];
const transmissionTypes = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'];

for (let i = 0; i < 100; i++) {
  let registrationNumber;

  // Ensure the registration number is unique
  do {
    registrationNumber = faker.vehicle.vrm();
  } while (registrationNumbers.has(registrationNumber));

  registrationNumbers.add(registrationNumber);

  const car = {
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: faker.date.past(10, new Date()).getFullYear(),
    vin: faker.vehicle.vin(),
    bodyType: faker.random.arrayElement(bodyTypes),
    engineType: faker.random.arrayElement(engineTypes),
    transmissionType: faker.random.arrayElement(transmissionTypes),
    fuelEfficiency: faker.datatype.number({ min: 10, max: 60 }),
    numberOfSeats: faker.datatype.number({ min: 2, max: 8 }),
    color: faker.commerce.color(),
    dailyRentalRate: faker.datatype.number({ min: 30, max: 200 }),
    weeklyRentalRate: faker.datatype.number({ min: 200, max: 1200 }),
    monthlyRentalRate: faker.datatype.number({ min: 800, max: 4000 }),
    availabilityStatus: faker.random.arrayElement(availabilityStatuses),
    location: faker.address.city(),
    gpsIncluded: faker.datatype.boolean(),
    airConditioning: faker.datatype.boolean(),
    bluetoothConnectivity: faker.datatype.boolean(),
    infotainmentSystem: faker.datatype.boolean(),
    additionalFeatures: faker.commerce.productAdjective(),
    policyNumber: faker.finance.account(),
    expiryDate: faker.date.future(),
    registrationNumber: registrationNumber,
    lastInspectionDate: faker.date.past(),
    nextInspectionDate: faker.date.future(),
    exteriorPhotos: [faker.image.imageUrl(), faker.image.imageUrl()],
    interiorPhotos: [faker.image.imageUrl(), faker.image.imageUrl()],
    currentMileage: faker.datatype.number({ min: 0, max: 200000 }),
    serviceHistory: faker.lorem.sentence(),
    damageDetails: faker.lorem.sentence(),
    notes: faker.lorem.sentence()
  };

  carData.push(car);
}

fs.writeFileSync('carData.json', JSON.stringify(carData, null, 2));
console.log('100 dummy car data entries have been generated and saved to carData.json');
