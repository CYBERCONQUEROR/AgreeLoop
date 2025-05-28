import React, { useState } from 'react';
import { Upload, MapPin, Leaf, DollarSign, BarChart, Check } from 'lucide-react';

const WasteListingForm: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeComplete, setAnalyzeComplete] = useState(false);
  
  // AI predicted data
  const [wasteType, setWasteType] = useState('');
  const [suggestedUse, setSuggestedUse] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState('');
  const [co2Saved, setCo2Saved] = useState('');

  const cropTypes = [
    'Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 
    'Potato', 'Tomato', 'Onion', 'Coconut', 'Other'
  ];

  const locations = [
    'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 
    'West Bengal', 'Maharashtra', 'Karnataka', 'Tamil Nadu'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAutoCategorizePrediction = () => {
    setIsAnalyzing(true);
    
    // Simulate AI prediction with timeout
    setTimeout(() => {
      // This would be replaced with actual AI model prediction
      setWasteType(cropType === 'Rice' ? 'Rice Straw' : cropType === 'Wheat' ? 'Wheat Straw' : 'Agricultural Residue');
      setSuggestedUse(cropType === 'Rice' ? 'Biochar, Mushroom Cultivation' : 'Compost, Animal Bedding');
      setSuggestedPrice('2500');
      setCo2Saved('450');
      
      setIsAnalyzing(false);
      setAnalyzeComplete(true);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    alert('Waste listing submitted successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">List Your Agricultural Waste</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Form Inputs */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Waste Image
                </label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-4 h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                    image ? 'border-primary-300' : 'border-gray-300'
                  }`}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  
                  {image ? (
                    <img 
                      src={image} 
                      alt="Waste Preview" 
                      className="h-full object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              
              {/* Crop Type */}
              <div>
                <label htmlFor="crop-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Crop Type
                </label>
                <select
                  id="crop-type"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select Crop Type</option>
                  {cropTypes.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
              
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (tons)
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0.1"
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {/* Auto Categorize Button */}
              <button
                type="button"
                onClick={handleAutoCategorizePrediction}
                disabled={!cropType || !quantity || !location || isAnalyzing}
                className={`w-full flex items-center justify-center p-3 rounded-lg font-medium ${
                  !cropType || !quantity || !location || isAnalyzing
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-secondary-500 hover:bg-secondary-600 text-white'
                } transition-colors`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analyzing Waste...
                  </>
                ) : (
                  <>
                    <Leaf className="mr-2 h-5 w-5" />
                    Auto Categorize Waste
                  </>
                )}
              </button>
            </div>
            
            {/* Right Column - AI Predictions */}
            <div className="space-y-6">
              {/* Waste Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waste Type
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="text-gray-800 font-medium">
                      {wasteType || 'Will be auto-filled from model'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Suggested Use */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggested Use
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="text-gray-800">
                    {suggestedUse || 'Will be auto-filled from model'}
                  </span>
                </div>
              </div>
              
              {/* Suggested Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggested Price
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-success-500 mr-2" />
                    <span className="text-gray-800 font-medium">
                      {suggestedPrice ? `₹${suggestedPrice}/ton` : 'Will be auto-filled from model'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* CO₂ Saved */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CO₂ Saved
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-secondary-500 mr-2" />
                    <span className="text-gray-800 font-medium">
                      {co2Saved ? `${co2Saved} kg` : 'Will be auto-filled from model'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={!analyzeComplete}
                className={`w-full flex items-center justify-center p-3 rounded-lg font-medium ${
                  !analyzeComplete
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                } transition-colors mt-8`}
              >
                <Check className="mr-2 h-5 w-5" />
                Submit Waste Listing
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WasteListingForm;