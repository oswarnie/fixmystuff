import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Wrench, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 animate-fade-in"
        >
          <Wrench className="h-6 w-6 text-fixmystuff-teal" />
          <span className="font-bold text-xl gradient-text">fixmystuff.io</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6 animate-fade-in">
          <Link to="/" className="text-gray-600 hover:text-fixmystuff-teal transition-colors">Home</Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-fixmystuff-teal transition-colors">How It Works</Link>
          <Link to="/community" className="text-gray-600 hover:text-fixmystuff-teal transition-colors">Community</Link>
          <Link to="/about" className="text-gray-600 hover:text-fixmystuff-teal transition-colors">About</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-3 animate-fade-in">
          <Button variant="outline" className="border-fixmystuff-teal text-fixmystuff-teal hover:bg-fixmystuff-teal/10">
            Log In
          </Button>
          <Button className="bg-fixmystuff-teal hover:bg-fixmystuff-teal/90">
            Sign Up
          </Button>
        </div>
        
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-600 py-2 hover:text-fixmystuff-teal transition-colors">Home</Link>
            <Link to="/how-it-works" className="text-gray-600 py-2 hover:text-fixmystuff-teal transition-colors">How It Works</Link>
            <Link to="/community" className="text-gray-600 py-2 hover:text-fixmystuff-teal transition-colors">Community</Link>
            <Link to="/about" className="text-gray-600 py-2 hover:text-fixmystuff-teal transition-colors">About</Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              <Button variant="outline" className="w-full border-fixmystuff-teal text-fixmystuff-teal hover:bg-fixmystuff-teal/10">
                Log In
              </Button>
              <Button className="w-full bg-fixmystuff-teal hover:bg-fixmystuff-teal/90">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
