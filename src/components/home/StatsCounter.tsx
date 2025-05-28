import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, DollarSign } from 'lucide-react';

const StatsCounter: React.FC = () => {
  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <CounterCard 
            icon={<Leaf className="h-10 w-10 text-primary-500" />}
            title="Total CO₂ Saved"
            value="1,23,000"
            unit="kg"
            color="bg-primary-50"
            textColor="text-primary-800"
          />
          
          <CounterCard 
            icon={<DollarSign className="h-10 w-10 text-secondary-500" />}
            title="Total Farmer Earnings"
            value="3,40,000"
            unit="₹"
            color="bg-secondary-50"
            textColor="text-secondary-800"
          />
        </div>
      </div>
    </div>
  );
};

interface CounterCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
  color: string;
  textColor: string;
}

const CounterCard: React.FC<CounterCardProps> = ({ icon, title, value, unit, color, textColor }) => {
  return (
    <motion.div 
      className={`${color} rounded-xl p-6 shadow-sm border border-gray-100`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start">
        <div className="mr-4">
          {icon}
        </div>
        <div>
          <h3 className={`text-lg font-medium ${textColor}`}>{title}</h3>
          <div className="flex items-end mt-2">
            {unit === "₹" && <span className="text-3xl font-bold mr-1">{unit}</span>}
            <span className="text-3xl md:text-4xl font-bold">{value}</span>
            {unit !== "₹" && <span className="text-xl ml-1">{unit}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCounter;