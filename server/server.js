const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

let districts = []; // Array to store district data

// Read initial data from data.json and store it in the in-memory array
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data.json:', err);
    return;
  }
  districts = JSON.parse(data);
});

// Function to update data for a random district
function updateRandomDistrictData() {
  const randomIndex = Math.floor(Math.random() * districts.length); // Get a random index
  const randomDistrict = districts[randomIndex]; // Get the random district
  console.log(`Updating data for district: ${randomDistrict.district}`);

  // Update data for the random district
  const updatedData = generateRandomData();
  Object.assign(randomDistrict, updatedData);
}

// Function to generate random data for a district
function generateRandomData() {
  return {
    condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)], // Random weather condition
    humidity: Math.floor(Math.random() * 101), // Random humidity (0-100)
    pressure: Math.floor(Math.random() * 1001) + 900, // Random pressure (900-1900)
    temp: Math.floor(Math.random() * 31) + 20 // Random temperature (20-50)
  };
}

// Update data for a random district every 3 seconds
setInterval(() => {
  updateRandomDistrictData();
}, 2000);

// Route to get data for all districts
app.get('/api/data', (req, res) => {
  res.json(districts);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
