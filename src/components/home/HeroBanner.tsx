import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Factory } from 'lucide-react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70"></div>
      </div>

      <div className="container mx-auto px-4 z-10 py-24">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Turn Waste into Wealth
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-primary-50 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Connect Farmers with Industries for a Greener Tomorrow
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to="/farmer" 
              className="flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors text-lg"
            >
              <Sprout className="mr-2 h-5 w-5" />
              Get Started as Farmer
            </Link>
            
            <Link 
              to="/company" 
              className="flex items-center justify-center bg-white hover:bg-gray-100 text-primary-800 py-3 px-6 rounded-lg font-medium transition-colors text-lg"
            >
              <Factory className="mr-2 h-5 w-5" />
              Explore Listings as Company
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;