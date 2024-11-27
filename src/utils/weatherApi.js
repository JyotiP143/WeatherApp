import axios from 'axios';

const API_KEY = '1795c6b14564aa9e8fc6951a821b66ef';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch weather data'
    );
  }
};

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error(
      error.response?.data?.message || 'Failed to fetch weather data'
    );
  }
};