import React, { useState } from 'react';
import { Cloud } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { DistrictSelector } from './components/DistrictSelector';
import { SearchBar } from './components/SearchBar';
import { getWeatherData, getWeatherByCity } from './services/weatherApi';
import { WeatherData } from './types/weather';
import { indianDistricts } from './data/indianDistricts';
import { getErrorMessage } from './utils/errors';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const handleDistrictSelect = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(lat, lon);
      setWeatherData(data);
      setSelectedDistrict(indianDistricts.find(d => d.lat === lat && d.lon === lon)?.name || null);
    } catch (err) {
      setError(getErrorMessage(err));
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedDistrict(null);
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(getErrorMessage(err));
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Weather App</h1>
          </div>
          <p className="text-gray-600">Search for any city or select a district to check the weather</p>
        </div>

        <div className="flex flex-col items-center gap-8">
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {weatherData && <WeatherCard data={weatherData} />}

          {!weatherData && !loading && !error && (
            <div className="text-center text-gray-500">
              <p>Search for a city or select a district to view weather information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;