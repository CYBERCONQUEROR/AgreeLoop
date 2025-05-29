// src/components/company/WasteListings.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Package, Leaf, DollarSign, Loader } from 'lucide-react';
import { db, firebase } from '../../lib/supabase'; // Change to '../../lib/firebase' if needed

interface Listing {
  id: string;
  crop_type: string;
  quantity: number;
  location: string;
  listed_date: firebase.firestore.Timestamp | null;
  suggested_use_predicted?: string;
  co2_saved_predicted?: number;
  image_url: string;
  waste_type_predicted?: string;
}

const wasteTypes = [
  'All',
  'Rice Straw',
  'Wheat Straw',
  'Sugarcane Bagasse',
  'Cotton Stalk',
  'Maize Stover',
  'Potato Peel',
  'Tomato Residue',
  'Onion Skin',
  'Coconut Husk',
  'Other'
];

const states = [
  'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'West Bengal',
  'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Other'
];

const WasteListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingRegion, setPendingRegion] = useState('Punjab');
  const [pendingWasteType, setPendingWasteType] = useState('All');

  // This state triggers the actual Firestore fetch
  const [filters, setFilters] = useState({
    region: 'Punjab',
    wasteType: 'All',
    search: '',
  });

  useEffect(() => {
    setLoading(true);
    setError(null);

    let query = db.collection('waste_listings')
      .where('location', '==', filters.region);

    if (filters.wasteType !== 'All') {
      query = query.where('waste_type_predicted', '==', filters.wasteType);
    }

    query.orderBy('listed_date', 'desc')
      .get()
      .then((snapshot: firebase.firestore.QuerySnapshot) => {
        const fetchedListings: Listing[] = [];
        snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          fetchedListings.push({ id: doc.id, ...doc.data() } as Listing);
        });
        setListings(fetchedListings);
        setLoading(false);
      })
      .catch((err: firebase.firestore.FirestoreError) => {
        setError(err.message || 'Failed to fetch listings.');
        setLoading(false);
      });

  }, [filters]);

  // Filter by crop name in memory
  const filteredListings = filters.search.trim() === ''
    ? listings
    : listings.filter(listing =>
        listing.crop_type.toLowerCase().includes(filters.search.trim().toLowerCase())
      );

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Search by crop name */}
        <input
          type="text"
          placeholder="Search by crop name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-1"
        />

        {/* State selection */}
        <select
          value={pendingRegion}
          onChange={e => setPendingRegion(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        {/* Waste type filter */}
        <select
          value={pendingWasteType}
          onChange={e => setPendingWasteType(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {wasteTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Search button */}
        <button
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-1 rounded"
          onClick={() => {
            setFilters({
              region: pendingRegion,
              wasteType: pendingWasteType,
              search: searchTerm,
            });
          }}
          type="button"
        >
          Search
        </button>
      </div>

      {/* Loading, Error, and No Results States */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-12 w-12 animate-spin text-primary-500" />
          <p className="ml-4 text-gray-600">Loading listings...</p>
        </div>
      ) : error ? (
        <div className="text-center text-error-600 py-10">Error: {error}</div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No waste listings found for this type.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredListings.map((listing, index) => (
            <WasteListingCard key={listing.id} listing={listing} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

// Helper to format Firestore Timestamp
const formatDate = (timestamp: firebase.firestore.Timestamp | null) => {
  if (!timestamp) return 'Date N/A';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return timestamp.toDate().toLocaleDateString(undefined, options);
};

interface WasteListingCardProps {
  listing: Listing;
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
        <div className="md:w-1/3 h-48 md:h-auto relative">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.crop_type}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="p-5 md:w-2/3">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{listing.crop_type}</h3>
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
              <span>Listed {formatDate(listing.listed_date)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-2">Suggested Use:</span>
              <span className="font-medium text-gray-800">{listing.suggested_use_predicted || 'N/A'}</span>
            </div>
            {listing.co2_saved_predicted && (
              <div className="flex items-center text-sm">
                <Leaf className="h-4 w-4 mr-1 text-primary-500" />
                <span className="text-primary-700 font-medium">Est. Carbon Saved: {listing.co2_saved_predicted} kg</span>
              </div>
            )}
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