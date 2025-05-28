import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Download } from 'lucide-react';

// Sample data for CO2 offset
const co2OffsetData = [
  { month: 'Jan', offset: 12.5 },
  { month: 'Feb', offset: 14.2 },
  { month: 'Mar', offset: 18.9 },
  { month: 'Apr', offset: 21.5 },
  { month: 'May', offset: 25.4 },
  { month: 'Jun', offset: 24.5 },
];

// Sample data for green procurements
const procurementData = [
  { month: 'Jan', value: 15 },
  { month: 'Feb', value: 12 },
  { month: 'Mar', value: 25 },
  { month: 'Apr', value: 31 },
  { month: 'May', value: 28 },
  { month: 'Jun', value: 33 },
];

const CompanyAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Company ESG Analytics</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CO2 Offset Trendline */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">CO₂ Offset Trendline</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={co2OffsetData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value} tons`} />
                  <Tooltip formatter={(value) => [`${value} tons`, 'CO₂ Offset']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="offset" 
                    name="CO₂ Offset (tons)"
                    stroke="#4CAF50" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 bg-success-50 rounded-lg p-3 flex items-center">
              <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
              <span className="text-sm text-success-800">
                Total CO₂ Offset: <strong>117 tons</strong> (YTD)
              </span>
            </div>
          </div>
          
          {/* Green Procurements */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">Green Procurements</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={procurementData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}`, 'Procurements']} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    name="Number of Procurements"
                    stroke="#2196F3" 
                    fill="#E3F2FD" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 bg-secondary-50 rounded-lg p-3 flex items-center">
              <CheckCircle className="h-5 w-5 text-secondary-500 mr-2" />
              <span className="text-sm text-secondary-800">
                Total Procurements: <strong>144</strong> (YTD)
              </span>
            </div>
          </div>
        </div>
        
        {/* ESG Badge */}
        <div className="mt-8 bg-secondary-50 rounded-xl p-6 border border-secondary-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-lg font-medium text-secondary-800 mb-1">ESG Badge Generator</h4>
              <p className="text-sm text-secondary-600 max-w-md">
                Generate ESG badges based on your activity to showcase your environmental commitment on your website or reports.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <div className="bg-white rounded-lg py-3 px-6 shadow-sm border border-secondary-100 flex items-center">
                <div className="h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-secondary-800 text-lg font-bold">A+</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Your ESG Rating</p>
                  <p className="text-xs text-gray-600">Updated: Jun 15, 2025</p>
                </div>
              </div>
              
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors h-12 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Badge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;