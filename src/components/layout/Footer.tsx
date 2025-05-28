import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-primary-300" />
              <span className="ml-2 text-xl font-bold">AgriWaste Exchange</span>
            </div>
            <p className="mt-4 text-primary-100">
              Connecting farmers with industries to transform agricultural waste into valuable resources.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/farmer" label="For Farmers" />
              <FooterLink to="/company" label="For Companies" />
              <FooterLink to="/ai-demo" label="AI Demo Lab" />
              <FooterLink to="/impact" label="Impact Dashboard" />
              <FooterLink to="/about" label="About Us" />
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="/blog" label="Blog" />
              <FooterLink to="/faq" label="FAQs" />
              <FooterLink to="/tutorials" label="Tutorials" />
              <FooterLink to="/api" label="API Documentation" />
              <FooterLink to="/research" label="Research" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-primary-300 mt-0.5" />
                <span>info@agriwaste.exchange</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary-300 mt-0.5" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-200">
            &copy; {new Date().getFullYear()} AgriWaste Exchange. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-primary-200 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-primary-200 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link to={to} className="text-primary-200 hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return (
    <a
      href="#"
      className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center hover:bg-primary-600 transition-colors"
    >
      {icon}
    </a>
  );
};

export default Footer;