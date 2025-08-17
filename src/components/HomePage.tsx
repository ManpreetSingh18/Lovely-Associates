import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building, Key, MapPin, Phone, Mail, Star, Users, Award, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Set SEO meta tags
    document.title = 'Lovely Associates - Making Realty Dreams a Reality | East Delhi Real Estate';
    
    const updateOrCreateMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    const updateOrCreateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        ogTag.setAttribute('content', content);
        document.head.appendChild(ogTag);
      }
    };

    // Meta tags
    updateOrCreateMetaTag('description', 'Lovely Associates - Over 20 years of trusted real estate service in East Delhi. Buy, sell, and rent properties in Geeta Colony, Krishna Nagar, and surrounding areas.');
    updateOrCreateMetaTag('keywords', 'real estate East Delhi, property dealers Delhi, Geeta Colony properties, Krishna Nagar real estate, buy sell rent property Delhi, Lovely Associates');
    updateOrCreateMetaTag('author', 'Lovely Associates');
    updateOrCreateMetaTag('robots', 'index, follow');

    // OpenGraph tags
    updateOrCreateOGTag('og:title', 'Lovely Associates - Making Realty Dreams a Reality | East Delhi Real Estate');
    updateOrCreateOGTag('og:description', 'Over 20 years of trusted real estate service in East Delhi. Buy, sell, and rent properties in prime locations.');
    updateOrCreateOGTag('og:type', 'website');
    updateOrCreateOGTag('og:image', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200');
    updateOrCreateOGTag('og:url', window.location.href);

    // Twitter Card tags
    updateOrCreateMetaTag('twitter:card', 'summary_large_image');
    updateOrCreateMetaTag('twitter:title', 'Lovely Associates - Making Realty Dreams a Reality');
    updateOrCreateMetaTag('twitter:description', 'Over 20 years of trusted real estate service in East Delhi. Buy, sell, and rent properties in prime locations.');
    updateOrCreateMetaTag('twitter:image', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.href);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', window.location.href);
      document.head.appendChild(canonicalLink);
    }

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Lovely Associates",
      "description": "Over 20 years of trusted real estate service in East Delhi",
      "url": window.location.origin,
      "telephone": "+91-9899XXXXXX",
      "email": "lovelyassociates@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Near Geeta Colony",
        "addressLocality": "East Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110031",
        "addressCountry": "IN"
      },
      "areaServed": [
        "Geeta Colony",
        "Krishna Nagar",
        "Chander Nagar",
        "Beverly Hills",
        "Mayurdhwaj",
        "East Delhi"
      ],
      "serviceType": [
        "Property Sales",
        "Property Purchase",
        "Property Rental",
        "Real Estate Consultation"
      ]
    };

    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  const featuredAreas = [
    'Geeta Colony',
    'Krishna Nagar', 
    'Chander Nagar',
    'Beverly Hills',
    'Mayurdhwaj Apartments',
    'Ekta Apartments',
    'Preet Vihar',
    'East delhi areas'

  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Home, number: '1000+', label: 'Properties Sold' },
    { icon: Award, number: '20+', label: 'Years Experience' },
    { icon: Star, number: '4.8', label: 'Client Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Making Realty Dreams a Reality
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Over 20 years of trusted real estate service in East Delhi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/services"
              className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
            >
              <span>Explore Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Lovely Associates
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Lovely Associates has helped hundreds find their dream homes in East Delhi for over two decades. 
                We specialize in sale, purchase, and rentals of both commercial and residential properties.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our deep understanding of the local market, combined with personalized service and transparent 
                dealings, has made us the most trusted name in East Delhi real estate.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-800" />
                  <span className="text-gray-700">20+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-800" />
                  <span className="text-gray-700">Trusted Service</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Lovely Associates Office"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-800 text-white p-6 rounded-lg shadow-xl">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Happy Families</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-800 transition-colors duration-300">
                <Home className="h-8 w-8 text-blue-800 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rent</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Find your perfect rental home or commercial space in East Delhi's prime locations.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 text-blue-800 font-semibold hover:text-blue-900 transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <Building className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sale</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get the best value for your property with our expert market analysis and verified buyers.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 text-blue-800 font-semibold hover:text-blue-900 transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                <Key className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Purchase</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Discover your dream property from our extensive portfolio of residential and commercial spaces.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 text-blue-800 font-semibold hover:text-blue-900 transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Areas Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore prime locations in East Delhi where we have extensive property portfolios
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featuredAreas.map((area, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group overflow-hidden"
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <MapPin className="h-8 w-8 mb-4 text-blue-200" />
                  <h3 className="text-lg font-bold mb-2">{area}</h3>
                  {/* <p className="text-blue-100 text-sm">Explore Properties</p> */}
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let our experienced team help you navigate East Delhi's real estate market
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <a
              href="tel:+919899XXXXXX"
              className="border-2 border-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;