import React from 'react';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign, Leaf } from 'lucide-react';

// Sample data for farmer earnings
const earningsData = [
  { month: 'Jan', earnings: 8000 },
  { month: 'Feb', earnings: 6500 },
  { month: 'Mar', earnings: 9500 },
  { month: 'Apr', earnings: 12000 },
  { month: 'May', earnings: 10500 },
  { month: 'Jun', earnings: 11000 },
];

// Sample data for waste types sold
const wasteTypesData = [
  { name: 'Rice Straw', value: 40, color: '#4CAF50' },
  { name: 'Wheat Straw', value: 30, color: '#8BC34A' },
  { name: 'Sugarcane Bagasse', value: 15, color: '#CDDC39' },
  { name: 'Coconut Husk', value: 10, color: '#FFC107' },
  { name: 'Other', value: 5, color: '#FF9800' },
];

const FarmerAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Farmer Analytics</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Earnings Chart */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">Monthly Earnings</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={earningsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${value}`} />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Earnings']} />
                  <Legend />
                  <Bar dataKey="earnings" fill="#4CAF50" name="Earnings (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 text-success-500 mr-1" />
              <span>Average Monthly Earnings: ₹9,583</span>
            </div>
          </div>
          
          {/* Types of Waste Sold Chart */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-4">Types of Waste Sold</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wasteTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
              <Leaf className="h-4 w-4 text-primary-500 mr-1" />
              <span>Total Waste Sold: 12.5 tons</span>
            </div>
          </div>
        </div>
        
        {/* CO2 Saved Stat */}
        <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-medium text-primary-800 mb-1">Total CO₂ Saved</h4>
              <p className="text-sm text-primary-600">By repurposing agricultural waste</p>
            </div>
            
            <div className="bg-white rounded-lg py-4 px-8 shadow-sm">
              <div className="flex items-center">
                <Leaf className="h-6 w-6 text-primary-500 mr-2" />
                <span className="text-3xl font-bold text-primary-700">18,230 kg</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-primary-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '73%' }}></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-primary-700">
              <span>0 kg</span>
              <span>Target: 25,000 kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerAnalytics;