import React from 'react';
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-6 w-6 text-yellow-500" />
              <h3 className="text-xl font-bold">Lovely Associates</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner in finding the perfect property. With years of experience in Delhi's real estate market, 
              we specialize in residential and commercial properties across prime locations.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Properties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Rent</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Buy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sell</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investment</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300">6/35 geeta colony, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300">+91 9818084198</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300">singhragbir10@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Lovely Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;