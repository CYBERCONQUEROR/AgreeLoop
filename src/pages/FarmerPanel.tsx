import React from 'react';
import WasteListingForm from '../components/farmer/WasteListingForm';
import FarmerSidebar from '../components/farmer/FarmerSidebar';

const FarmerPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Farmer Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Waste Listing Form */}
          <div className="lg:col-span-2">
            <WasteListingForm />
          </div>
          
          {/* Sidebar - Farmer Stats */}
          <div>
            <FarmerSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerPanel;