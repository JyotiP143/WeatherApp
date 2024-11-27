import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { indianDistricts } from '../data/indianDistricts';
import clsx from 'clsx';

export default function DistrictSelector({ onSelectDistrict, selectedDistrict }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm md:text-base text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
          <span>{selectedDistrict || 'Select a district'}</span>
        </div>
        <svg
          className={clsx(
            'w-4 h-4 md:w-5 md:h-5 transition-transform duration-200',
            isOpen ? 'transform rotate-180' : ''
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {indianDistricts.map((district) => (
            <button
              key={district.name}
              onClick={() => {
                onSelectDistrict(district.lat, district.lon);
                setIsOpen(false);
              }}
              className={clsx(
                'w-full text-left px-4 py-2 text-sm md:text-base hover:bg-blue-50 transition-colors',
                selectedDistrict === district.name
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700'
              )}
            >
              {district.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}