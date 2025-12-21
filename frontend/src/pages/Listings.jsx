import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { Search, Filter, MapPin, DollarSign, Bed, Bath } from 'lucide-react';

const Listings = () => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
  });

  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: 2500000,
      pricePerSqft: '$850/sqft',
      bedrooms: 5,
      bathrooms: 4,
      area: '3,200 sqft',
      type: 'For Sale',
      aiMatch: 98,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      title: 'Downtown Penthouse',
      location: 'Manhattan, NY',
      price: 3800000,
      pricePerSqft: '$1,200/sqft',
      bedrooms: 4,
      bathrooms: 3,
      area: '2,800 sqft',
      type: 'For Sale',
      aiMatch: 96,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      title: 'Waterfront Estate',
      location: 'Miami Beach, FL',
      price: 5200000,
      pricePerSqft: '$950/sqft',
      bedrooms: 6,
      bathrooms: 5,
      area: '4,500 sqft',
      type: 'For Sale',
      aiMatch: 97,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      title: 'Urban Loft Studio',
      location: 'Brooklyn, NY',
      price: 850000,
      pricePerSqft: '$650/sqft',
      bedrooms: 2,
      bathrooms: 1,
      area: '1,300 sqft',
      type: 'For Sale',
      aiMatch: 95,
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1567496898669-ee935f003f30',
      title: 'Mountain Retreat',
      location: 'Aspen, CO',
      price: 3200000,
      pricePerSqft: '$720/sqft',
      bedrooms: 4,
      bathrooms: 3,
      area: '4,200 sqft',
      type: 'For Sale',
      aiMatch: 94,
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      title: 'Tech Hub Apartment',
      location: 'San Francisco, CA',
      price: 1950000,
      pricePerSqft: '$1,100/sqft',
      bedrooms: 3,
      bathrooms: 2,
      area: '1,800 sqft',
      type: 'For Rent',
      aiMatch: 96,
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="section-title">Browse Properties</h1>
          <p className="section-subtitle">
            Discover AI-verified properties with accurate market valuations
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex items-center mb-6">
            <Filter className="text-primary-500 mr-2" />
            <h2 className="text-xl font-bold">Advanced Filters</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="input-field pl-10"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="number"
                placeholder="Min Price"
                className="input-field pl-10"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="number"
                placeholder="Max Price"
                className="input-field pl-10"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
            <div className="relative">
              <Bed className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                className="input-field pl-10"
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              >
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <select
              className="input-field"
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
            <div className="text-gray-600 dark:text-gray-400">
              Showing {properties.length} properties
            </div>
            <button className="btn-primary">
              <Search className="mr-2" size={20} />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700">
              ← Previous
            </button>
            {[1, 2, 3, '...', 10].map((page, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-lg ${
                  page === 1
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;