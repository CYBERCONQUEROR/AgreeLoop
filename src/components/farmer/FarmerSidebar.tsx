import React from 'react';
import { DollarSign, Leaf, Package } from 'lucide-react';

const FarmerSidebar: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Stats</h2>
        
        <div className="space-y-6">
          {/* Earnings */}
          <div>
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-success-500 mr-2" />
              <h3 className="text-gray-700 font-medium">This Month's Earnings</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹12,000</p>
            <p className="text-sm text-success-600 mt-1">+8% from last month</p>
          </div>
          
          {/* CO₂ Saved */}
          <div>
            <div className="flex items-center mb-2">
              <Leaf className="h-5 w-5 text-primary-500 mr-2" />
              <h3 className="text-gray-700 font-medium">CO₂ Saved</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">5.4 tons</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">70% of your yearly target</p>
          </div>
          
          {/* Active Listings */}
          <div>
            <div className="flex items-center mb-2">
              <Package className="h-5 w-5 text-secondary-500 mr-2" />
              <h3 className="text-gray-700 font-medium">Active Listings</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            
            <div className="mt-4 space-y-3">
              {['Rice Straw', 'Coconut Husk', 'Wheat Straw'].map((listing, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{listing}</span>
                  <span className="bg-secondary-100 text-secondary-800 py-1 px-2 rounded">Active</span>
                </div>
              ))}
            </div>
          </div>
          
          <hr className="my-6 border-gray-200" />
          
          {/* Quick Tips */}
          <div>
            <h3 className="text-gray-700 font-medium mb-3">Quick Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                Add photos to increase chances of selling by 85%
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                Complete your profile to get featured in search results
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                Join our WhatsApp group for instant notifications
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSidebar;