import axios from 'axios';

const apiV2 = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

const apiV3 = axios.create({
  baseURL: 'https://api.openweathermap.org/data/3.0',
});

export { apiV2, apiV3 };
