import React from 'react';
import { Bed, Bath, Square, MapPin, Heart, Eye } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <div className="card group overflow-hidden">
      {/* Property Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            property.type === 'For Sale' 
              ? 'bg-green-500/20 text-green-500' 
              : 'bg-blue-500/20 text-blue-500'
          }`}>
            {property.type}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 rounded-full bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm hover:bg-white">
            <Heart size={20} />
          </button>
          <button className="p-2 rounded-full bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm hover:bg-white">
            <Eye size={20} />
          </button>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ₹{property.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {property.pricePerSqft}/sqft
            </div>
          </div>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 dark:border-dark-700">
          <div className="flex items-center space-x-2">
            <Bed className="text-gray-500" size={20} />
            <div>
              <div className="font-semibold">{property.bedrooms}</div>
              <div className="text-sm text-gray-500">Beds</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Bath className="text-gray-500" size={20} />
            <div>
              <div className="font-semibold">{property.bathrooms}</div>
              <div className="text-sm text-gray-500">Baths</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Square className="text-gray-500" size={20} />
            <div>
              <div className="font-semibold">{property.area}</div>
              <div className="text-sm text-gray-500">Sqft</div>
            </div>
          </div>
        </div>

        {/* AI Prediction Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded bg-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              AI Price Match: {property.aiMatch}%
            </span>
          </div>
          <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;