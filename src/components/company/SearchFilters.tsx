import React, { useState } from 'react';
import { Search, MapPin, Package, Filter } from 'lucide-react';

const SearchFilters: React.FC = () => {
  const [wasteType, setWasteType] = useState('');
  const [region, setRegion] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const wasteTypes = [
    'Rice Straw', 'Wheat Straw', 'Sugarcane Bagasse', 
    'Coconut Husk', 'Corn Stalks', 'Cotton Stalks'
  ];

  const regions = [
    'All India', 'North India', 'South India', 
    'East India', 'West India', 'Central India'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic would go here
    console.log({ wasteType, region, minQuantity, maxDistance });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Search Listings</h2>
          
          <button 
            className="mt-2 md:mt-0 flex items-center text-secondary-600 hover:text-secondary-800 transition-colors text-sm font-medium"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
          </button>
        </div>
        
        <form onSubmit={handleSearch}>
          {/* Main Search */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Waste Type */}
            <div className="flex-1">
              <label htmlFor="waste-type" className="block text-sm font-medium text-gray-700 mb-1">
                Waste Type
              </label>
              <select
                id="waste-type"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              >
                <option value="">All Waste Types</option>
                {wasteTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Region */}
            <div className="flex-1">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <div className="relative">
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                >
                  <option value="">All Regions</option>
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Search Button */}
            <div className="self-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-secondary-500 hover:bg-secondary-600 text-white p-2 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Minimum Quantity */}
              <div>
                <label htmlFor="min-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Quantity (tons)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="min-quantity"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(e.target.value)}
                    min="0"
                    placeholder="Any quantity"
                    className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                  />
                  <Package className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {/* Maximum Distance */}
              <div>
                <label htmlFor="max-distance" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Distance (km)
                </label>
                <input
                  type="number"
                  id="max-distance"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  min="0"
                  placeholder="Any distance"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                />
              </div>
              
              {/* More filters could be added here */}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchFilters;