import React from 'react';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { kelvinToCelsius } from '../utils/temperature';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto transform transition-all hover:scale-105">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-32 h-32"
        />
        <p className="text-5xl font-bold text-gray-800 my-4">
          {kelvinToCelsius(data.main.temp)}°C
        </p>
        <p className="text-xl text-gray-600 capitalize">{data.weather[0].description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
          <Thermometer className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Feels Like</p>
            <p className="font-semibold">{kelvinToCelsius(data.main.feels_like)}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
          <Droplets className="text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-lg">
          <Wind className="text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold">{data.wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-lg">
          <Cloud className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">Weather</p>
            <p className="font-semibold">{data.weather[0].main}</p>
          </div>
        </div>
      </div>
    </div>
  );
};