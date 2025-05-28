import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const DynamicPricing: React.FC = () => {
  const [wasteType, setWasteType] = useState('');
  const [location, setLocation] = useState('');
  const [season, setSeason] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [priceResult, setPriceResult] = useState<any>(null);

  const wasteTypes = [
    'Rice Straw', 'Wheat Straw', 'Sugarcane Bagasse', 
    'Coconut Husk', 'Corn Stalks', 'Cotton Stalks'
  ];

  const locations = [
    'Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 
    'Karnataka', 'Kerala', 'West Bengal', 'Gujarat'
  ];

  const seasons = [
    'Winter (Dec-Feb)', 'Summer (Mar-May)', 
    'Monsoon (Jun-Sep)', 'Post-Monsoon (Oct-Nov)'
  ];

  const calculatePrice = () => {
    setIsCalculating(true);
    
    // Simulate AI prediction with timeout
    setTimeout(() => {
      // This would be replaced with actual AI model prediction
      const basePrice = {
        'Rice Straw': 2500,
        'Wheat Straw': 2200,
        'Sugarcane Bagasse': 1800,
        'Coconut Husk': 3000,
        'Corn Stalks': 1600,
        'Cotton Stalks': 1900
      }[wasteType] || 2000;
      
      // Location multiplier
      const locationMultiplier = {
        'Punjab': 1.2,
        'Haryana': 1.1,
        'Uttar Pradesh': 1.0,
        'Maharashtra': 1.15,
        'Karnataka': 0.95,
        'Kerala': 1.25,
        'West Bengal': 0.9,
        'Gujarat': 1.05
      }[location] || 1.0;
      
      // Season multiplier
      const seasonMultiplier = {
        'Winter (Dec-Feb)': 1.2,
        'Summer (Mar-May)': 0.9,
        'Monsoon (Jun-Sep)': 0.8,
        'Post-Monsoon (Oct-Nov)': 1.1
      }[season] || 1.0;
      
      // Quantity adjustment
      const quantityMultiplier = parseFloat(quantity) > 5 ? 0.9 : 1.0;
      
      const calculatedPrice = Math.round(basePrice * locationMultiplier * seasonMultiplier * quantityMultiplier);
      const priceRange = {
        min: Math.round(calculatedPrice * 0.9),
        max: Math.round(calculatedPrice * 1.1)
      };
      
      setPriceResult({
        suggestedPrice: calculatedPrice,
        priceRange,
        demandLevel: Math.random() > 0.5 ? 'High' : 'Medium',
        marketTrend: Math.random() > 0.5 ? 'Rising' : 'Stable',
        factors: [
          { name: 'Base Price', value: `₹${basePrice}/ton` },
          { name: 'Location Factor', value: `${(locationMultiplier * 100).toFixed(0)}%` },
          { name: 'Seasonal Factor', value: `${(seasonMultiplier * 100).toFixed(0)}%` },
          { name: 'Quantity Discount', value: `${(quantityMultiplier * 100).toFixed(0)}%` }
        ]
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Dynamic Pricing</h3>
        <p className="text-gray-600 mb-6">Get optimal price predictions based on waste type, location and season</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Waste Type */}
            <div>
              <label htmlFor="price-waste-type" className="block text-sm font-medium text-gray-700 mb-1">
                Waste Type
              </label>
              <select
                id="price-waste-type"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                required
              >
                <option value="">Select Waste Type</option>
                {wasteTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="price-location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="price-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            {/* Season */}
            <div>
              <label htmlFor="price-season" className="block text-sm font-medium text-gray-700 mb-1">
                Season
              </label>
              <select
                id="price-season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                required
              >
                <option value="">Select Season</option>
                {seasons.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            
            {/* Quantity */}
            <div>
              <label htmlFor="price-quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (tons)
              </label>
              <input
                type="number"
                id="price-quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0.1"
                step="0.1"
                placeholder="Enter quantity"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                required
              />
            </div>
            
            {/* Calculate Button */}
            <button
              onClick={calculatePrice}
              disabled={!wasteType || !location || !season || !quantity || isCalculating}
              className={`w-full flex items-center justify-center p-3 rounded-lg font-medium ${
                !wasteType || !location || !season || !quantity || isCalculating
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-secondary-500 hover:bg-secondary-600 text-white'
              } transition-colors`}
            >
              {isCalculating ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-5 w-5" />
                  Calculate Price
                </>
              )}
            </button>
          </div>
          
          {/* Results Section */}
          <div className={`bg-gray-50 rounded-xl p-6 ${priceResult ? 'border border-success-200' : 'border border-gray-200'}`}>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Price Estimate</h4>
            
            {!priceResult ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-200 rounded-full p-4">
                  <DollarSign className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mt-4">
                  Fill in the details and click "Calculate Price" to get an AI-powered price recommendation
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500 mb-1">Suggested Price</p>
                  <p className="text-4xl font-bold text-success-600">₹{priceResult.suggestedPrice}</p>
                  <p className="text-sm text-gray-600 mt-1">per ton</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Price Range:</span>
                    <span className="text-sm font-medium">₹{priceResult.priceRange.min} - ₹{priceResult.priceRange.max}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Market Demand:</span>
                    <span 
                      className={`text-sm font-medium ${
                        priceResult.demandLevel === 'High' 
                          ? 'text-success-600' 
                          : priceResult.demandLevel === 'Medium'
                            ? 'text-accent-600'
                            : 'text-gray-600'
                      }`}
                    >
                      {priceResult.demandLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price Trend:</span>
                    <span className="text-sm font-medium">{priceResult.marketTrend}</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Price Factors</h5>
                  <div className="space-y-2">
                    {priceResult.factors.map((factor: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{factor.name}</span>
                        <span className="font-medium">{factor.value}</span>
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

export default DynamicPricing;