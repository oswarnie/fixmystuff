
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool, Mail, Instagram, Twitter, Facebook, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Tool className="h-6 w-6 text-fixmystuff-teal" />
              <span className="font-bold text-xl">fixmystuff.io</span>
            </div>
            <p className="text-gray-400 mb-6">
              A community-powered platform helping people fix their broken items instead of replacing them.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> How It Works
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Community
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Electronics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Furniture
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Appliances
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Clothing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-fixmystuff-teal transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Automotive
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <a 
              href="mailto:hello@fixmystuff.io" 
              className="inline-block px-4 py-2 bg-fixmystuff-teal text-white rounded-md hover:bg-fixmystuff-teal/80 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} fixmystuff.io. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
