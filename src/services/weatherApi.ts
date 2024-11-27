import axios, { AxiosError } from 'axios';
import { WeatherData } from '../types/weather';
import { WeatherApiError } from '../utils/errors';

const API_KEY = '1795c6b14564aa9e8fc6951a821b66ef';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new WeatherApiError(
        error.response?.data?.message || 'Failed to fetch weather data'
      );
    }
    throw new WeatherApiError('Failed to fetch weather data');
  }
};

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new WeatherApiError('City not found. Please check the spelling and try again.');
      }
      throw new WeatherApiError(
        error.response?.data?.message || 'Failed to fetch weather data'
      );
    }
    throw new WeatherApiError('Failed to fetch weather data');
  }
};