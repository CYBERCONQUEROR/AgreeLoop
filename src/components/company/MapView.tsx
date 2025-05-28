import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Sample data for waste listings with coordinates
const listings = [
  { id: 1, type: 'Rice Straw', quantity: '2 tons', location: 'Punjab', coordinates: [75.5, 31.5], co2Saved: '2920' },
  { id: 2, type: 'Sugarcane Bagasse', quantity: '5 tons', location: 'Maharashtra', coordinates: [73.8, 18.5], co2Saved: '3800' },
  { id: 3, type: 'Coconut Husk', quantity: '1.5 tons', location: 'Kerala', coordinates: [76.3, 10.2], co2Saved: '1450' },
  { id: 4, type: 'Wheat Straw', quantity: '3 tons', location: 'Haryana', coordinates: [76.5, 29.1], co2Saved: '2100' },
  { id: 5, type: 'Cotton Stalks', quantity: '2.5 tons', location: 'Gujarat', coordinates: [72.6, 23.0], co2Saved: '1850' },
  { id: 6, type: 'Corn Stalks', quantity: '1.8 tons', location: 'Karnataka', coordinates: [77.0, 13.5], co2Saved: '1620' }
];

// Faking mapboxgl token - in a real app, use an actual token from your .env file
mapboxgl.accessToken = 'pk.fake.token.for.demo.purposes.only';

const MapView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapLibraryLoaded, setIsMapLibraryLoaded] = useState(false);

  // Mock implementation to show UI without actual Mapbox functionality
  useEffect(() => {
    // Check if the container ref is available
    if (!mapContainer.current) return;

    // Simulate map loading delay
    const timer = setTimeout(() => {
      setIsMapLibraryLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Map View</h2>
        
        <div 
          ref={mapContainer}
          className="h-[400px] rounded-lg bg-gray-100 relative overflow-hidden"
        >
          {!isMapLibraryLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-secondary-500 border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading map...</p>
              </div>
            </div>
          ) : (
            // Mock map UI with pins
            <div className="absolute inset-0 bg-blue-50">
              <img 
                src="https://images.pexels.com/photos/3933181/pexels-photo-3933181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Map of India" 
                className="w-full h-full object-cover opacity-70"
              />
              
              {/* Mock pins */}
              {listings.map((listing) => (
                <div 
                  key={listing.id}
                  className="absolute w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                  style={{ 
                    // Random positioning for demo
                    left: `${30 + Math.random() * 40}%`,  
                    top: `${20 + Math.random() * 60}%`
                  }}
                  title={`${listing.type} - ${listing.quantity} - ${listing.location}`}
                >
                  <span className="text-white text-xs font-bold">{listing.id}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    <p className="font-bold text-sm">{listing.type}</p>
                    <p className="text-xs text-gray-600">{listing.quantity} • {listing.location}</p>
                    <p className="text-xs text-primary-600">CO₂ Saved: {listing.co2Saved} kg</p>
                  </div>
                </div>
              ))}
              
              {/* Map controls mock */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="bg-white p-2 rounded shadow-md">+</button>
                <button className="bg-white p-2 rounded shadow-md">−</button>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md text-sm">
            <p className="font-medium">Found {listings.length} waste listings</p>
            <p className="text-xs text-gray-500">Click on pins to view details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;