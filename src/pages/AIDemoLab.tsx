import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import WasteCategorization from '../components/ai/WasteCategorization';
import DynamicPricing from '../components/ai/DynamicPricing';
import CarbonEstimator from '../components/ai/CarbonEstimator';
import { Brain } from 'lucide-react';

const AIDemoLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('categorization');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-secondary-100 text-secondary-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Brain className="h-4 w-4 mr-2" />
              AI Lab
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Experience Our AI in Action
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Try our artificial intelligence models to categorize waste, predict prices, 
              and calculate environmental impact in real-time.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <TabsList value={activeTab} onValueChange={setActiveTab}>
                <TabsTrigger value="categorization">
                  Waste Categorization
                </TabsTrigger>
                <TabsTrigger value="pricing">
                  Dynamic Pricing
                </TabsTrigger>
                <TabsTrigger value="carbon">
                  Carbon Estimator
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="categorization" active={activeTab === 'categorization'}>
              <WasteCategorization />
            </TabsContent>
            
            <TabsContent value="pricing" active={activeTab === 'pricing'}>
              <DynamicPricing />
            </TabsContent>
            
            <TabsContent value="carbon" active={activeTab === 'carbon'}>
              <CarbonEstimator />
            </TabsContent>
          </div>
          
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Want to Integrate Our AI into Your System?
            </h2>
            <p className="text-gray-600 mb-4">
              We offer API access for enterprise customers to integrate our AI models directly into your workflow.
            </p>
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-6 rounded-lg font-medium transition-colors">
              Explore API Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDemoLab;