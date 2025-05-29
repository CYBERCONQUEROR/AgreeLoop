import React from 'react';
import { FileDown, RefreshCw, BarChart2 } from 'lucide-react';

interface DashboardWidgetsProps {
  onShowAiRecommendations: () => void;
}

const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({ onShowAiRecommendations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Widget 1: CO₂ Offset */}
      <div className="bg-primary-50 rounded-xl p-4 sm:p-6 border border-primary-100 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-primary-800 font-medium text-sm sm:text-base">Total CO₂ Offset</h3>
            <div className="bg-primary-100 p-2 rounded-lg">
              <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
            </div>
          </div>
          <p className="text-primary-900 text-xl sm:text-2xl font-bold">24.5 tons</p>
          <p className="text-primary-700 text-xs sm:text-sm mt-1">This Quarter</p>
        </div>
        <div className="mt-4">
          <div className="w-full bg-primary-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-xs text-primary-700 mt-1">65% of quarterly target</p>
        </div>
      </div>
      
      {/* Widget 2: ESG Report */}
      <div className="bg-secondary-50 rounded-xl p-4 sm:p-6 border border-secondary-100 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-secondary-800 font-medium text-sm sm:text-base">ESG Report</h3>
            <div className="bg-secondary-100 p-2 rounded-lg">
              <FileDown className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600" />
            </div>
          </div>
          <p className="text-secondary-900 text-base sm:text-lg font-medium">Q2 2025 Report Ready</p>
        </div>
        <button 
          className="mt-4 bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors w-full flex items-center justify-center"
          onClick={() => alert('Download PDF functionality to be implemented.')}
        >
          Download PDF Report
        </button>
      </div>
      
      {/* Widget 3: AI Recommendations */}
      <div className="bg-accent-50 rounded-xl p-4 sm:p-6 border border-accent-100 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-accent-800 font-medium text-sm sm:text-base">AI Matches</h3>
            <div className="bg-accent-100 p-2 rounded-lg">
              <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 text-accent-600" />
            </div>
          </div>
          <p className="text-accent-900 text-base sm:text-lg font-medium">Personalized Suggestions</p>
        </div>
        <button 
          onClick={() => {
            if (typeof onShowAiRecommendations === 'function') {
              onShowAiRecommendations();
            } else {
              console.error('CRITICAL: onShowAiRecommendations prop is NOT a function or is undefined in DashboardWidgets!');
              alert('Error: Recommendation feature is currently unavailable. (Developer note: Prop missing or not a function)');
            }
          }}
          className="mt-4 bg-accent-600 hover:bg-accent-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors w-full flex items-center justify-center"
        >
          See Recommended Matches
        </button>
      </div>
    </div>
  );
};
export default DashboardWidgets;
