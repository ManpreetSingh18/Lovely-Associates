import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Phone, Mail, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-800" />
            <div>
              <h1 className="text-2xl font-bold text-blue-800">Lovely Associates</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Your Trusted Property Partners</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-800 border-b-2 border-blue-800 pb-1'
                    : 'text-gray-700 hover:text-blue-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <a href="tel:+919899XXXXXX" className="hover:text-blue-800 transition-colors">
                +91-9899XXXXXX
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <a href="mailto:lovelyassociates@gmail.com" className="hover:text-blue-800 transition-colors">
                lovelyassociates@gmail.com
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-800 bg-blue-50 px-3 py-2 rounded-lg'
                      : 'text-gray-700 hover:text-blue-800 px-3 py-2'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Contact Info */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <a href="tel:+919899XXXXXX" className="hover:text-blue-800 transition-colors">
                  +91-9899XXXXXX
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <a href="mailto:lovelyassociates@gmail.com" className="hover:text-blue-800 transition-colors">
                  lovelyassociates@gmail.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;