'use client';

import { useState } from 'react';
import { Cloud } from 'lucide-react';
import WeatherCard from '../components/WeatherCard';
import DistrictSelector from '../components/DistrictSelector';
import SearchBar from '../components/SearchBar';
import { getWeatherData, getWeatherByCity } from '../utils/weatherApi';
import { indianDistricts } from '../data/indianDistricts';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleDistrictSelect = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(lat, lon);
      setWeatherData(data);
      setSelectedDistrict(data.name);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedDistrict(null);
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-8 px-4 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Weather App</h1>
          </div>
          <p className="text-sm md:text-base text-gray-600">
            Search for any city or select a district to check the weather
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div className="w-full flex flex-col gap-4 items-center">
            <SearchBar onSearch={handleCitySearch} isLoading={loading} />
            <div className="text-center text-gray-600">- or -</div>
            <DistrictSelector
              onSelectDistrict={handleDistrictSelect}
              selectedDistrict={selectedDistrict}
            />
          </div>

          {loading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm md:text-base">
              {error}
            </div>
          )}

          {weatherData && <WeatherCard data={weatherData} />}

          {!weatherData && !loading && !error && (
            <div className="text-center text-gray-500 text-sm md:text-base">
              <p>Search for a city or select a district to view weather information</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}