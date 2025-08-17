import React from "react";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

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
              Your trusted partner in finding the perfect property. With years
              of experience in Delhi's real estate market, we specialize in
              residential and commercial properties across prime locations.
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
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Rent
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Buy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sell
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Investment
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4">

              <a
                href="https://www.google.com/maps/search/?api=1&query=Lovely+Associates+Geeta+Colony+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 space-x-2 hover:text-blue-800 transition-colors"
                aria-label="Open map location"
              >
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span>6/35, Geeta Colony, Delhi</span>
              </a>

              <a
                href="mailto:singhragbir10@gmail.com"
                className="flex items-center text-gray-300 space-x-2 hover:text-blue-800 transition-colors"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5 text-yellow-500" />
                <span>singhragbir10@gmail.com</span>
              </a>

              <a
                href="tel:+919818084198"
                className="flex items-center text-gray-300 space-x-2 hover:text-blue-800 transition-colors"
                aria-label="Call us"
              >
                <Phone className="h-5 w-5 text-yellow-500" />
                <span>+91 9818084198 , 8168180344</span>
              </a>

              

              
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Lovely Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
