import React from 'react';
import { FileDown, RefreshCw, BarChart2 } from 'lucide-react';

const DashboardWidgets: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* CO2 Offset Widget */}
      <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-primary-800 font-medium">Total CO₂ Offset</h3>
            <p className="text-primary-900 text-2xl font-bold mt-2">24.5 tons</p>
            <p className="text-primary-700 text-sm mt-1">This Quarter</p>
          </div>
          <div className="bg-primary-100 p-2 rounded-lg">
            <BarChart2 className="h-6 w-6 text-primary-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-primary-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-xs text-primary-700 mt-1">65% of quarterly target</p>
        </div>
      </div>
      
      {/* ESG Report Widget */}
      <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-secondary-800 font-medium">ESG Report</h3>
            <p className="text-secondary-900 text-lg font-medium mt-2">Q2 2025 Report Ready</p>
          </div>
          <div className="bg-secondary-100 p-2 rounded-lg">
            <FileDown className="h-6 w-6 text-secondary-600" />
          </div>
        </div>
        <button className="mt-6 bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors w-full flex items-center justify-center">
          Download PDF Report
        </button>
      </div>
      
      {/* AI Recommendations Widget */}
      <div className="bg-accent-50 rounded-xl p-6 border border-accent-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-accent-800 font-medium">AI Matches</h3>
            <p className="text-accent-900 text-lg font-medium mt-2">5 new recommendations</p>
          </div>
          <div className="bg-accent-100 p-2 rounded-lg">
            <RefreshCw className="h-6 w-6 text-accent-600" />
          </div>
        </div>
        <button className="mt-6 bg-accent-600 hover:bg-accent-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors w-full flex items-center justify-center">
          See Recommended Matches
        </button>
      </div>
    </div>
  );
};

export default DashboardWidgets;