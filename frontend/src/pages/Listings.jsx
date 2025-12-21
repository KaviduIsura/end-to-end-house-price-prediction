import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { Search, Filter, MapPin, DollarSign, Bed, ChevronLeft, ChevronRight } from 'lucide-react';

const Listings = () => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
      title: 'Luxury Villa in Whitefield',
      location: 'Whitefield, Bangalore',
      price: 35000000,
      pricePerSqft: '₹9,500/sqft',
      bedrooms: 4,
      bathrooms: 4,
      area: '3,600 sqft',
      type: 'For Sale',
      aiMatch: 98,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      title: 'Premium Apartment near MG Road',
      location: 'MG Road, Bangalore',
      price: 28000000,
      pricePerSqft: '₹14,000/sqft',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,000 sqft',
      type: 'For Sale',
      aiMatch: 96,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      title: 'Lake View Villa in Hebbal',
      location: 'Hebbal, Bangalore',
      price: 42000000,
      pricePerSqft: '₹10,500/sqft',
      bedrooms: 5,
      bathrooms: 5,
      area: '4,000 sqft',
      type: 'For Sale',
      aiMatch: 97,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      title: 'Compact 2BHK in Electronic City',
      location: 'Electronic City, Bangalore',
      price: 8500000,
      pricePerSqft: '₹6,500/sqft',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,300 sqft',
      type: 'For Sale',
      aiMatch: 95,
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1567496898669-ee935f003f30',
      title: 'Gated Community Villa in Sarjapur',
      location: 'Sarjapur Road, Bangalore',
      price: 26000000,
      pricePerSqft: '₹8,000/sqft',
      bedrooms: 4,
      bathrooms: 4,
      area: '3,250 sqft',
      type: 'For Sale',
      aiMatch: 94,
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      title: 'Furnished 3BHK near IT Hub',
      location: 'Marathahalli, Bangalore',
      price: 55000,
      pricePerSqft: '₹30/sqft',
      bedrooms: 3,
      bathrooms: 2,
      area: '1,850 sqft',
      type: 'For Rent',
      aiMatch: 96,
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1',
      title: 'Luxury 3BHK in Indiranagar',
      location: 'Indiranagar, Bangalore',
      price: 32000000,
      pricePerSqft: '₹16,000/sqft',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,000 sqft',
      type: 'For Sale',
      aiMatch: 97,
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      title: 'Independent House in Jayanagar',
      location: 'Jayanagar, Bangalore',
      price: 45000000,
      pricePerSqft: '₹15,000/sqft',
      bedrooms: 5,
      bathrooms: 4,
      area: '3,000 sqft',
      type: 'For Sale',
      aiMatch: 98,
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
      title: 'Affordable 2BHK in Yelahanka',
      location: 'Yelahanka, Bangalore',
      price: 7800000,
      pricePerSqft: '₹6,000/sqft',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,300 sqft',
      type: 'For Sale',
      aiMatch: 93,
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c',
      title: 'Premium Apartment on Bannerghatta Road',
      location: 'Bannerghatta Road, Bangalore',
      price: 19000000,
      pricePerSqft: '₹9,500/sqft',
      bedrooms: 3,
      bathrooms: 3,
      area: '2,000 sqft',
      type: 'For Sale',
      aiMatch: 95,
    },
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1572120360610-d971b9b78825',
      title: 'Spacious 4BHK in HSR Layout',
      location: 'HSR Layout, Bangalore',
      price: 26000000,
      pricePerSqft: '₹11,000/sqft',
      bedrooms: 4,
      bathrooms: 4,
      area: '2,400 sqft',
      type: 'For Sale',
      aiMatch: 96,
    },
    {
      id: 12,
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
      title: 'Fully Furnished 2BHK for Rent',
      location: 'BTM Layout, Bangalore',
      price: 42000,
      pricePerSqft: '₹32/sqft',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,300 sqft',
      type: 'For Rent',
      aiMatch: 94,
    },
  ];

  // Calculate pagination values
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);
  const showingFrom = indexOfFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, properties.length);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      // Show all pages if total pages are 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      // Always show last page if not already shown
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Handle filter application
  const handleApplyFilters = () => {
    // Reset to first page when filters change
    setCurrentPage(1);
    // Here you would implement actual filtering logic
    console.log('Applying filters:', filters);
  };

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
              Showing {showingFrom}-{showingTo} of {properties.length} properties
            </div>
            <button 
              className="btn-primary"
              onClick={handleApplyFilters}
            >
              <Search className="mr-2" size={20} />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* No properties found message */}
        {currentProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No properties found matching your criteria.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-12 space-y-4 sm:space-y-0">
            <div className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-primary-500 text-white font-semibold'
                        : 'bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700'
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              ))}
              
              <button 
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {itemsPerPage} properties per page
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;