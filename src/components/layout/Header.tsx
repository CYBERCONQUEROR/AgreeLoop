import React, { useState, useEffect as ReactEffectHeader } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext'; // Uses Firebase via AuthContext

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOutUser, userRole } = useAuth();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  ReactEffectHeader(() => { const handleScroll = () => setIsScrolled(window.scrollY > 10); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
  ReactEffectHeader(() => { setIsMenuOpen(false); }, [location]);
  const handleSignOut = async () => { await signOutUser(); };
  const getDashboardPath = () => userRole === 'farmer' ? '/farmer' : userRole === 'company' ? '/company' : '/';
  const isLandingPage = location.pathname === '/';
  const headerBgClass = isScrolled || isMenuOpen || !isLandingPage ? 'bg-white shadow-md py-3' : 'bg-transparent py-4';
  const textClass = isScrolled || isMenuOpen || !isLandingPage ? 'text-primary-700' : 'text-white';
  const hoverTextClass = isScrolled || isMenuOpen || !isLandingPage ? 'hover:text-primary-600' : 'hover:text-gray-200';

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-4"><div className="flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <img src="/logo.png" alt="AgriLoop Logo" className="h-9 w-9 mr-2 transition-all duration-300 group-hover:opacity-80" /> 
          <span className={`text-xl font-bold ${textClass} group-hover:opacity-80 transition-colors`}>AgriLoop</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-6">
          <NavLink to="/" label="Home" currentPathname={location.pathname} baseTextClass={textClass} hoverTextClass={hoverTextClass}/>
          {user && userRole && <NavLink to={getDashboardPath()} label="My Dashboard" currentPathname={location.pathname} baseTextClass={textClass} hoverTextClass={hoverTextClass}/>}
          <NavLink to="/ai-demo" label="AI Lab" currentPathname={location.pathname} baseTextClass={textClass} hoverTextClass={hoverTextClass}/>
          <NavLink to="/impact" label="Impact" currentPathname={location.pathname} baseTextClass={textClass} hoverTextClass={hoverTextClass}/>
          <NavLink to="/about" label="About" currentPathname={location.pathname} baseTextClass={textClass} hoverTextClass={hoverTextClass}/>
          {user ? (<div className="relative group">
            <button className={`flex items-center ${textClass} ${hoverTextClass} transition-colors px-2 py-1 rounded-md`}>
              {user.photoURL ? (<img src={user.photoURL} alt="User" className="h-7 w-7 rounded-full mr-2"/>) : (<UserCircle size={22} className="mr-2" />)}
              <span className="text-sm font-medium">{user.displayName?.split(' ')[0] || 'Profile'}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
              <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 flex items-center"><LogOut size={16} className="mr-2" /> Sign Out</button>
            </div>
          </div>
          ) : (<Link to="/" className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isScrolled || isMenuOpen || !isLandingPage ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'}`}>Sign In / Register</Link>)}
        </nav>
        <button className={`md:hidden ${textClass} ${hoverTextClass} focus:outline-none`} onClick={toggleMenu}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {isMenuOpen && (<div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-fade-in"><div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
        <NavLink to="/" label="Home" mobile currentPathname={location.pathname} />
        {user && userRole && <NavLink to={getDashboardPath()} label="My Dashboard" mobile currentPathname={location.pathname} />}
        <NavLink to="/ai-demo" label="AI Lab" mobile currentPathname={location.pathname} />
        <NavLink to="/impact" label="Impact" mobile currentPathname={location.pathname} />
        <NavLink to="/about" label="About" mobile currentPathname={location.pathname} />
        {user ? (<button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-md flex items-center"><LogOut size={16} className="mr-2" /> Sign Out</button>)
         : (<Link to="/" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-md transition-colors w-full text-center font-medium">Sign In / Register</Link>)}
      </div></div>)}
      </div>
    </header>
  );
};

export default Header;

interface NavLinkProps { to: string; label: string; currentPathname: string; baseTextClass?: string; hoverTextClass?: string; mobile?: boolean; }
const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPathname, baseTextClass, hoverTextClass, mobile }) => {
  const isActive = currentPathname === to;
  if (mobile) { return (<Link to={to} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}>{label}</Link>); }
  return (<Link to={to} className={`transition-colors text-sm font-medium px-1 py-0.5 border-b-2 ${isActive ? `border-primary-500 ${baseTextClass}` : `border-transparent ${baseTextClass} ${hoverTextClass}`}`}>{label}</Link>);
};