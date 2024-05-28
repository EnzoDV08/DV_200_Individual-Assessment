// backend/testApi.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  method: 'GET',
  url: 'https://zillow-com1.p.rapidapi.com/property',
  params: { zpid: '2080998890' },
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
  }
};

const fetchPropertyData = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching property data: ${error.response ? error.response.data : error.message}`);
  }
};

fetchPropertyData();


