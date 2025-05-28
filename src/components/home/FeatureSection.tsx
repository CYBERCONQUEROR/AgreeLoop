import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Recycle, 
  BarChart3, 
  Tags, 
  DollarSign, 
  LayoutGrid, 
  PanelRight, 
  Brain, 
  ArrowRight 
} from 'lucide-react';

const FeatureSection: React.FC = () => {
  return (
    <div className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* What We Do Section */}
        <SectionHeader 
          title="What We Do"
          description="We connect farmers with industries through an AI-powered marketplace that turns agricultural waste into valuable resources."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard 
            icon={<Recycle />}
            title="Waste to Resource"
            description="Transform agricultural waste into valuable inputs for industries while reducing environmental impact."
            delay={0.1}
          />
          
          <FeatureCard 
            icon={<BarChart3 />}
            title="Income for Farmers"
            description="Create new revenue streams for farmers by monetizing what was previously considered waste."
            delay={0.2}
          />
          
          <FeatureCard 
            icon={<LayoutGrid />}
            title="Sustainable Marketplace"
            description="A digital platform connecting waste producers with industries needing raw materials."
            delay={0.3}
          />
        </div>
        
        {/* How AI Helps Section */}
        <div className="mt-24">
          <SectionHeader 
            title="How AI Helps"
            description="Our artificial intelligence models optimize the agricultural waste ecosystem through smart categorization, pricing, and environmental impact assessment."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              icon={<Tags />}
              title="Smart Categorization"
              description="AI identifies and categorizes waste types from images or descriptions for optimal reuse."
              delay={0.1}
            />
            
            <FeatureCard 
              icon={<DollarSign />}
              title="Dynamic Pricing"
              description="Get fair market prices based on waste type, quantity, location, and seasonal demand."
              delay={0.2}
            />
            
            <FeatureCard 
              icon={<PanelRight />}
              title="CO₂ Estimation"
              description="Calculate environmental impact and carbon offset for better ESG reporting."
              delay={0.3}
            />
          </div>
        </div>
        
        {/* Try AI Live Section */}
        <motion.div 
          className="mt-20 bg-secondary-50 rounded-2xl p-8 border border-secondary-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-secondary-600 mr-3" />
                <h3 className="text-2xl font-bold text-secondary-800">Try AI Live</h3>
              </div>
              <p className="text-secondary-700 mt-2 max-w-lg">
                Experience our AI models in action. Upload waste images, get price predictions, and estimate environmental impact.
              </p>
            </div>
            
            <Link 
              to="/ai-demo" 
              className="flex items-center justify-center bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Explore AI Lab
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <motion.div 
      className="text-center max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      <p className="mt-4 text-lg text-gray-600">{description}</p>
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="h-12 w-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default FeatureSection;