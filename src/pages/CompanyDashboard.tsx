import React, { useState } from 'react';
import SearchFilters from '../components/company/SearchFilters';
import WasteListings from '../components/company/WasteListings';
import MapView from '../components/company/MapView';
import DashboardWidgets from '../components/company/DashboardWidgets';
import { MapPin, List } from 'lucide-react';

const CompanyDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Company Dashboard</h1>
        
        {/* Dashboard Widgets */}
        <div className="mb-8">
          <DashboardWidgets />
        </div>
        
        {/* Search Filters */}
        <div className="mb-6">
          <SearchFilters />
        </div>
        
        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Available Listings</h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex">
            <button
              className={`px-4 py-2 flex items-center text-sm font-medium rounded-l-lg ${
                viewMode === 'list'
                  ? 'bg-secondary-50 text-secondary-700 border-r border-gray-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </button>
            <button
              className={`px-4 py-2 flex items-center text-sm font-medium rounded-r-lg ${
                viewMode === 'map'
                  ? 'bg-secondary-50 text-secondary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('map')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        {viewMode === 'list' ? (
          <WasteListings />
        ) : (
          <MapView />
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;