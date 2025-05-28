import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import FarmerAnalytics from '../components/impact/FarmerAnalytics';
import CompanyAnalytics from '../components/impact/CompanyAnalytics';
import { BarChart3 } from 'lucide-react';

const ImpactDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('farmer');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-primary-100 text-primary-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              <BarChart3 className="h-4 w-4 mr-2" />
              Impact Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Measuring Our Collective Impact
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Track environmental impact, farmer earnings, and ESG metrics to quantify the positive change we're creating together.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <TabsList value={activeTab} onValueChange={setActiveTab}>
                <TabsTrigger value="farmer">
                  Farmer Analytics
                </TabsTrigger>
                <TabsTrigger value="company">
                  Company ESG Metrics
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="farmer" active={activeTab === 'farmer'}>
              <FarmerAnalytics />
            </TabsContent>
            
            <TabsContent value="company" active={activeTab === 'company'}>
              <CompanyAnalytics />
            </TabsContent>
          </div>
          
          {/* Overall Impact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Platform Stats</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Farmers</p>
                  <p className="text-2xl font-bold text-gray-900">7,500+</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Total Companies</p>
                  <p className="text-2xl font-bold text-gray-900">250+</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Waste Listings</p>
                  <p className="text-2xl font-bold text-gray-900">12,430</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-xl p-6 shadow-md border border-primary-100">
              <h3 className="text-lg font-medium text-primary-800 mb-4">Environmental Impact</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-primary-700">Total CO₂ Saved</p>
                  <p className="text-2xl font-bold text-primary-900">1,23,000 kg</p>
                </div>
                
                <div>
                  <p className="text-sm text-primary-700">Waste Repurposed</p>
                  <p className="text-2xl font-bold text-primary-900">8,450 tons</p>
                </div>
                
                <div>
                  <p className="text-sm text-primary-700">Equivalent Trees Planted</p>
                  <p className="text-2xl font-bold text-primary-900">5,590</p>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary-50 rounded-xl p-6 shadow-md border border-secondary-100">
              <h3 className="text-lg font-medium text-secondary-800 mb-4">Economic Impact</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-secondary-700">Total Farmer Earnings</p>
                  <p className="text-2xl font-bold text-secondary-900">₹3,40,000</p>
                </div>
                
                <div>
                  <p className="text-sm text-secondary-700">Avg. Monthly Increase</p>
                  <p className="text-2xl font-bold text-secondary-900">₹4,500</p>
                </div>
                
                <div>
                  <p className="text-sm text-secondary-700">Transactions Completed</p>
                  <p className="text-2xl font-bold text-secondary-900">3,250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;