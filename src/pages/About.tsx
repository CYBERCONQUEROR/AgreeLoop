import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Mail, Phone, MapPin, Leaf } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Vision for a Greener Tomorrow
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transforming agricultural waste management through innovation, technology, and community engagement.
          </motion.p>
        </div>
        
        {/* Problem Statement */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/4894822/pexels-photo-4894822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Agricultural waste being burned in fields" 
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="p-8 md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">The Problem We're Solving</h2>
              
              <p className="text-gray-600 mb-6">
                India generates over 500 million tons of agricultural waste yearly. Most of this waste is burned in fields, causing:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-error-500 mr-2">•</span>
                  <span>Severe air pollution and respiratory health issues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-error-500 mr-2">•</span>
                  <span>Massive greenhouse gas emissions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-error-500 mr-2">•</span>
                  <span>Loss of potential revenue for farmers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-error-500 mr-2">•</span>
                  <span>Wasted resources that could be valuable inputs for industries</span>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
                <p className="text-primary-800 font-medium">
                  Our platform helps reduce these emissions while creating economic opportunities for farmers through AI-powered waste valorization.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Approach */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Our Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainable Resource Management</h3>
              <p className="text-gray-600">
                We transform agricultural waste from an environmental liability into a valuable resource through our AI-powered marketplace.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-secondary-50 rounded-lg flex items-center justify-center text-secondary-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Community Empowerment</h3>
              <p className="text-gray-600">
                We provide farmers with new income streams while helping companies meet their sustainability goals through responsible sourcing.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="h-12 w-12 bg-accent-50 rounded-lg flex items-center justify-center text-accent-600 mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data-Driven Impact</h3>
              <p className="text-gray-600">
                We use AI to optimize waste categorization, pricing, and environmental impact tracking for transparent ESG reporting.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Meet Our Team</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            A passionate group of environmental scientists, AI specialists, and agricultural experts committed to sustainable solutions.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Priya Sharma', role: 'Founder & CEO', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
              { name: 'Rajiv Mehta', role: 'CTO', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
              { name: 'Ananya Patel', role: 'Head of AI', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
              { name: 'Sanjay Kumar', role: 'Agricultural Scientist', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-gray-100 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Get in Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium">Email</p>
                    <p className="text-gray-600">info@agriwaste.exchange</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium">Phone</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium">Address</p>
                    <p className="text-gray-600">
                      123 Green Innovation Hub<br />
                      Bengaluru, Karnataka 560001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Research Inspiration</h3>
                <p className="text-gray-600 mb-4">
                  Our work is inspired by research from the Indian Agricultural Research Institute and various sustainable agriculture initiatives across India.
                </p>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  View Research Publications →
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="What would you like to tell us?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;