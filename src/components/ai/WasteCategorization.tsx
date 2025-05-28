import React, { useState } from 'react';
import { Upload, Leaf } from 'lucide-react';

const WasteCategorization: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cropType, setCropType] = useState('');
  const [results, setResults] = useState<any>(null);

  const cropTypes = [
    'Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 
    'Potato', 'Tomato', 'Onion', 'Coconut'
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

  const analyzeWaste = () => {
    setIsAnalyzing(true);
    
    // Simulate AI prediction with timeout
    setTimeout(() => {
      // This would be replaced with actual AI model prediction
      const wasteTypeMap: Record<string, string> = {
        'Rice': 'Rice Straw',
        'Wheat': 'Wheat Straw',
        'Sugarcane': 'Sugarcane Bagasse',
        'Cotton': 'Cotton Stalks',
        'Maize': 'Corn Stalks',
        'Coconut': 'Coconut Husk',
        'Potato': 'Potato Waste',
        'Tomato': 'Tomato Vine',
        'Onion': 'Onion Skin'
      };

      const suggestedUseMap: Record<string, string[]> = {
        'Rice': ['Biochar', 'Mushroom Cultivation', 'Animal Bedding'],
        'Wheat': ['Animal Feed', 'Compost', 'Paper Production'],
        'Sugarcane': ['Biofuel', 'Paper', 'Particleboard'],
        'Cotton': ['Biofuel', 'Mulch', 'Compost'],
        'Maize': ['Animal Feed', 'Bioethanol', 'Packaging'],
        'Coconut': ['Coir Products', 'Activated Carbon', 'Growing Medium'],
        'Potato': ['Starch Extraction', 'Animal Feed', 'Compost'],
        'Tomato': ['Compost', 'Biogas'],
        'Onion': ['Compost', 'Biogas', 'Natural Dye']
      };

      // Default to rice if no selection
      const selectedCrop = cropType || 'Rice';
      
      setResults({
        wasteType: wasteTypeMap[selectedCrop],
        confidence: 93.8,
        suggestedUses: suggestedUseMap[selectedCrop],
        composition: {
          cellulose: 42,
          hemicellulose: 28,
          lignin: 15,
          other: 15
        }
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Waste Categorization</h3>
        <p className="text-gray-600 mb-6">Upload an image or select crop type to categorize agricultural waste</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Waste Image
              </label>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                  image ? 'border-secondary-300' : 'border-gray-300'
                }`}
                onClick={() => document.getElementById('ai-image-upload')?.click()}
              >
                <input
                  type="file"
                  id="ai-image-upload"
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
            
            {/* Or Crop Type */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>
              
              <label htmlFor="ai-crop-type" className="block text-sm font-medium text-gray-700 mb-2">
                Select Crop Type
              </label>
              <select
                id="ai-crop-type"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              >
                <option value="">Select Crop Type</option>
                {cropTypes.map((crop) => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            
            {/* Analyze Button */}
            <button
              onClick={analyzeWaste}
              disabled={(!image && !cropType) || isAnalyzing}
              className={`w-full flex items-center justify-center p-3 rounded-lg font-medium ${
                (!image && !cropType) || isAnalyzing
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-secondary-500 hover:bg-secondary-600 text-white'
              } transition-colors`}
            >
              {isAnalyzing ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Leaf className="mr-2 h-5 w-5" />
                  Analyze Waste
                </>
              )}
            </button>
          </div>
          
          {/* Results Section */}
          <div className={`bg-gray-50 rounded-xl p-6 ${results ? 'border border-secondary-200' : 'border border-gray-200'}`}>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Analysis Results</h4>
            
            {!results ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-gray-200 rounded-full p-4">
                  <Leaf className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mt-4">
                  Upload an image or select a crop type and click "Analyze Waste" to see results
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="text-gray-700 font-medium">Waste Type</h5>
                    <span className="text-sm bg-secondary-100 text-secondary-800 py-1 px-2 rounded">
                      {results.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{results.wasteType}</p>
                </div>
                
                <div>
                  <h5 className="text-gray-700 font-medium mb-2">Suggested Uses</h5>
                  <div className="flex flex-wrap gap-2">
                    {results.suggestedUses.map((use: string, i: number) => (
                      <span 
                        key={i} 
                        className="bg-primary-100 text-primary-800 py-1 px-3 rounded-full text-sm"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-gray-700 font-medium mb-2">Composition</h5>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500" 
                      style={{ width: `${results.composition.cellulose}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Cellulose: {results.composition.cellulose}%</span>
                    <span>Hemicellulose: {results.composition.hemicellulose}%</span>
                    <span>Lignin: {results.composition.lignin}%</span>
                    <span>Other: {results.composition.other}%</span>
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

export default WasteCategorization;