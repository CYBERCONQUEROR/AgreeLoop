import React, { useState } from 'react';
// Ensure these paths are correct relative to src/pages/AIDemoLab.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import WasteCategorization from '../../components/ai/WasteCategorization';
import DynamicPricing from '../../components/ai/DynamicPricing';
import CarbonEstimator from '../../components/ai/CarbonEstimator';
import WasteValorizationIdeas from '../../components/ai/WasteValorizationIdeas';
import { Brain, Zap, DollarSign, BarChart3, Lightbulb } from 'lucide-react';

const AIDemoLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('categorization');
  // Default export for this component
  // export default AIDemoLab; // This should be at the end of the file if it's the main export

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-secondary-100 text-secondary-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Brain className="h-4 w-4 mr-2"/>AI Lab & Demo Zone
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore AgriLoop's AI Capabilities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our AI models: categorize waste, predict prices, estimate carbon impact, and discover innovative waste valorization ideas.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200 overflow-x-auto">
              {/* Ensure your Tabs, TabsList, TabsTrigger components are working correctly */}
              {/* The `className="min-w-max"` on Tabs might be for ensuring all tabs fit if they would otherwise wrap */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="min-w-max">
                <TabsList>
                  <TabsTrigger value="categorization" className="flex items-center"><Zap size={14} className="mr-1.5"/>Categorization</TabsTrigger>
                  <TabsTrigger value="pricing" className="flex items-center"><DollarSign size={14} className="mr-1.5"/>Pricing</TabsTrigger>
                  <TabsTrigger value="carbon" className="flex items-center"><BarChart3 size={14} className="mr-1.5"/>Carbon Estimator</TabsTrigger>
                  <TabsTrigger value="valorization" className="flex items-center"><Lightbulb size={14} className="mr-1.5"/>✨ Valorization</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {/* Ensure each of these child components are correctly implemented and exported */}
            <TabsContent value="categorization" active={activeTab==='categorization'}><WasteCategorization/></TabsContent>
            <TabsContent value="pricing" active={activeTab==='pricing'}><DynamicPricing/></TabsContent>
            <TabsContent value="carbon" active={activeTab==='carbon'}><CarbonEstimator/></TabsContent>
            <TabsContent value="valorization" active={activeTab==='valorization'}><WasteValorizationIdeas/></TabsContent>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Interested in Our Technology?</h2>
            <p className="text-gray-600 mb-4">We offer API access and custom solutions for enterprises. Let's innovate together!</p>
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-6 rounded-lg font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIDemoLab; // Ensure this is the default export for the file src/pages/AIDemoLab.tsx

