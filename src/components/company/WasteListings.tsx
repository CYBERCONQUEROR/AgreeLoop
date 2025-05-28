import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Package, Leaf, DollarSign } from 'lucide-react';

// Simulated waste listings data
const listingsData = [
  {
    id: 1,
    type: 'Rice Straw',
    quantity: '2',
    location: 'Punjab',
    date: '2 days ago',
    suggestedUse: 'Biochar',
    carbonSaved: '2920',
    image: 'https://images.pexels.com/photos/7195742/pexels-photo-7195742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    type: 'Sugarcane Bagasse',
    quantity: '5',
    location: 'Maharashtra',
    date: '4 days ago',
    suggestedUse: 'Paper Production',
    carbonSaved: '3800',
    image: 'https://images.pexels.com/photos/5634000/pexels-photo-5634000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    type: 'Coconut Husk',
    quantity: '1.5',
    location: 'Kerala',
    date: '1 week ago',
    suggestedUse: 'Coir Products',
    carbonSaved: '1450',
    image: 'https://images.pexels.com/photos/4999221/pexels-photo-4999221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    type: 'Wheat Straw',
    quantity: '3',
    location: 'Haryana',
    date: '3 days ago',
    suggestedUse: 'Animal Feed',
    carbonSaved: '2100',
    image: 'https://images.pexels.com/photos/45230/wheat-field-wheat-spike-cereals-grain-45230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const WasteListings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {listingsData.map((listing, index) => (
          <WasteListingCard key={listing.id} listing={listing} index={index} />
        ))}
      </div>
    </div>
  );
};

interface WasteListingCardProps {
  listing: {
    id: number;
    type: string;
    quantity: string;
    location: string;
    date: string;
    suggestedUse: string;
    carbonSaved: string;
    image: string;
  };
  index: number;
}

const WasteListingCard: React.FC<WasteListingCardProps> = ({ listing, index }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img 
            src={listing.image} 
            alt={listing.type} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="p-5 md:w-2/3">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{listing.type}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Package className="h-4 w-4 mr-2 text-secondary-500" />
              <span>{listing.quantity} tons</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-secondary-500" />
              <span>{listing.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-secondary-500" />
              <span>Listed {listing.date}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Suggested Use:</span>
              <span className="font-medium text-gray-800">{listing.suggestedUse}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Leaf className="h-4 w-4 mr-1 text-primary-500" />
              <span className="text-primary-700 font-medium">Carbon Saved: {listing.carbonSaved} kg</span>
            </div>
          </div>
          
          <button className="mt-4 bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Procure Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WasteListings;