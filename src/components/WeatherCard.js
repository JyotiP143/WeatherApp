import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import { kelvinToCelsius } from '../utils/temperature';

export default function WeatherCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-md mx-auto transform transition-all hover:scale-105">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-24 h-24 md:w-32 md:h-32"
        />
        <p className="text-4xl md:text-5xl font-bold text-gray-800 my-4">
          {kelvinToCelsius(data.main.temp)}°C
        </p>
        <p className="text-lg md:text-xl text-gray-600 capitalize">
          {data.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6">
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
          <Thermometer className="text-blue-500 w-5 h-5" />
          <div>
            <p className="text-xs md:text-sm text-gray-600">Feels Like</p>
            <p className="font-semibold text-sm md:text-base">
              {kelvinToCelsius(data.main.feels_like)}°C
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
          <Droplets className="text-green-500 w-5 h-5" />
          <div>
            <p className="text-xs md:text-sm text-gray-600">Humidity</p>
            <p className="font-semibold text-sm md:text-base">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-lg">
          <Wind className="text-purple-500 w-5 h-5" />
          <div>
            <p className="text-xs md:text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold text-sm md:text-base">{data.wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-lg">
          <Cloud className="text-orange-500 w-5 h-5" />
          <div>
            <p className="text-xs md:text-sm text-gray-600">Weather</p>
            <p className="font-semibold text-sm md:text-base">{data.weather[0].main}</p>
          </div>
        </div>
      </div>
    </div>
  );
}