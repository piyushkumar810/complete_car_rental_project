require("dotenv").config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');
const path = require("path");

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

const databaseName = 'DreamDrive';
const collectionName = 'carmodels';
const jsonFilePath = path.join(__dirname, "/Data_Folder/carData.json");

async function importJSON() {
    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        // Read the JSON file
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const data = JSON.parse(jsonData);

        // Insert data into MongoDB
        await collection.insertMany(data);
        console.log('JSON data successfully imported to MongoDB Atlas');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

importJSON();