import React, { useState } from 'react';
import { BarChart, Leaf } from 'lucide-react';

const CarbonEstimator: React.FC = () => {
  const [wasteType, setWasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [burnMethod, setBurnMethod] = useState('field');
  const [isCalculating, setIsCalculating] = useState(false);
  const [carbonResult, setCarbonResult] = useState<any>(null);

  const wasteTypes = [
    'Rice Straw', 'Wheat Straw', 'Sugarcane Bagasse', 
    'Coconut Husk', 'Corn Stalks', 'Cotton Stalks'
  ];

  const burnMethods = [
    { value: 'field', label: 'Field Burning' },
    { value: 'open', label: 'Open Burning' },
    { value: 'kiln', label: 'Traditional Kiln' }
  ];

  const calculateCarbon = () => {
    setIsCalculating(true);
    
    // Simulate AI prediction with timeout
    setTimeout(() => {
      // This would be replaced with actual AI model calculation
      // CO2 emission factors per ton of waste (kg CO2/ton)
      const emissionFactors = {
        'Rice Straw': { field: 1460, open: 1300, kiln: 1100 },
        'Wheat Straw': { field: 1380, open: 1250, kiln: 1050 },
        'Sugarcane Bagasse': { field: 1520, open: 1350, kiln: 1150 },
        'Coconut Husk': { field: 1650, open: 1480, kiln: 1250 },
        'Corn Stalks': { field: 1400, open: 1270, kiln: 1080 },
        'Cotton Stalks': { field: 1480, open: 1320, kiln: 1120 }
      }[wasteType as keyof typeof emissionFactors] || { field: 1460, open: 1300, kiln: 1100 };
      
      const emissionFactor = emissionFactors[burnMethod as keyof typeof emissionFactors];
      const qtyValue = parseFloat(quantity) || 1;
      
      const co2Saved = Math.round(emissionFactor * qtyValue);
      const treesEquivalent = Math.round(co2Saved / 22); // Avg tree absorbs ~22kg CO2 per year
      const carKmEquivalent = Math.round(co2Saved * 4); // ~250g CO2 per km driven
      
      setCarbonResult({
        co2Saved,
        treesEquivalent,
        carKmEquivalent,
        details: [
          { name: 'CO₂ Emission Factor', value: `${emissionFactor} kg/ton` },
          { name: 'Waste Quantity', value: `${qtyValue} tons` },
          { name: 'Burn Method', value: burnMethods.find(m => m.value === burnMethod)?.label || 'Field Burning' }
        ]
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Carbon Estimator</h3>
        <p className="text-gray-600 mb-6">Calculate CO₂ emissions saved by repurposing agricultural waste</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Waste Type */}
            <div>
              <label htmlFor="carbon-waste-type" className="block text-sm font-medium text-gray-700 mb-1">
                Waste Type
              </label>
              <select
                id="carbon-waste-type"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select Waste Type</option>
                {wasteTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Quantity */}
            <div>
              <label htmlFor="carbon-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (tons)
              </label>
              <input
                type="number"
                id="carbon-quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0.1"
                step="0.1"
                placeholder="Enter quantity"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            {/* Burn Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Burn Method (if not repurposed)
              </label>
              <div className="space-y-2">
                {burnMethods.map((method) => (
                  <label key={method.value} className="flex items-center">
                    <input
                      type="radio"
                      name="burn-method"
                      value={method.value}
                      checked={burnMethod === method.value}
                      onChange={() => setBurnMethod(method.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Calculate Button */}
            <button
              onClick={calculateCarbon}
              disabled={!wasteType || !quantity || isCalculating}
              className={`w-full flex items-center justify-center p-3 rounded-lg font-medium ${
                !wasteType || !quantity || isCalculating
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              } transition-colors mt-4`}
            >
              {isCalculating ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <BarChart className="mr-2 h-5 w-5" />
                  Calculate CO₂ Saved
                </>
              )}
            </button>
          </div>
          
          {/* Results Section */}
          <div className={`bg-gray-50 rounded-xl p-6 ${carbonResult ? 'border border-primary-200' : 'border border-gray-200'}`}>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Carbon Impact</h4>
            
            {!carbonResult ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-200 rounded-full p-4">
                  <Leaf className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mt-4">
                  Fill in the details and click "Calculate CO₂ Saved" to see your environmental impact
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500 mb-1">CO₂ Emissions Saved</p>
                  <div className="flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary-500 mr-2" />
                    <p className="text-4xl font-bold text-primary-600">{carbonResult.co2Saved.toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">kilograms of CO₂</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-800 text-sm font-bold">🌳</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Equivalent to</p>
                        <p className="font-medium text-primary-800">
                          {carbonResult.treesEquivalent.toLocaleString()} trees absorbing CO₂ for a year
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-800 text-sm font-bold">🚗</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Equivalent to</p>
                        <p className="font-medium text-primary-800">
                          {carbonResult.carKmEquivalent.toLocaleString()} kilometers not driven
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Calculation Details</h5>
                  <div className="space-y-2">
                    {carbonResult.details.map((detail: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{detail.name}</span>
                        <span className="font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonEstimator;