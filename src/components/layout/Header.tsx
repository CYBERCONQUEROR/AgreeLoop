import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-lg font-bold text-primary-800">AgriWaste Exchange</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/farmer" label="Farmers" />
            <NavLink to="/company" label="Companies" />
            <NavLink to="/ai-demo" label="AI Lab" />
            <NavLink to="/impact" label="Impact" />
            <NavLink to="/about" label="About" />
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors">
              Sign In
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-primary-500 focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <NavLink to="/" label="Home" mobile />
              <NavLink to="/farmer" label="Farmers" mobile />
              <NavLink to="/company" label="Companies" mobile />
              <NavLink to="/ai-demo" label="AI Lab" mobile />
              <NavLink to="/impact" label="Impact" mobile />
              <NavLink to="/about" label="About" mobile />
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors w-full">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, mobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${
        isActive
          ? 'text-primary-600 font-medium'
          : 'text-gray-600 hover:text-primary-500'
      } transition-colors ${mobile ? 'block py-2 border-b border-gray-100' : ''}`}
    >
      {label}
    </Link>
  );
};

export default Header;