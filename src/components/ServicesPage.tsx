import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, Key, ArrowRight, CheckCircle, Users, Award, Clock } from 'lucide-react';

const ServicesPage: React.FC = () => {
  useEffect(() => {
    // Set SEO meta tags
    document.title = 'Our Services - Buy, Sell & Rent Properties | Lovely Associates';
    
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
    updateOrCreateMetaTag('description', 'Comprehensive real estate services in East Delhi. Buy, sell, and rent residential & commercial properties with Lovely Associates - your trusted property partner.');
    updateOrCreateMetaTag('keywords', 'real estate services Delhi, buy property East Delhi, sell property Delhi, rent property Delhi, commercial real estate, residential properties, property dealers');
    updateOrCreateMetaTag('author', 'Lovely Associates');
    updateOrCreateMetaTag('robots', 'index, follow');

    // OpenGraph tags
    updateOrCreateOGTag('og:title', 'Our Services - Buy, Sell & Rent Properties | Lovely Associates');
    updateOrCreateOGTag('og:description', 'Comprehensive real estate services in East Delhi. Buy, sell, and rent residential & commercial properties with trusted experts.');
    updateOrCreateOGTag('og:type', 'website');
    updateOrCreateOGTag('og:image', 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1200');
    updateOrCreateOGTag('og:url', window.location.href);

    // Twitter Card tags
    updateOrCreateMetaTag('twitter:card', 'summary_large_image');
    updateOrCreateMetaTag('twitter:title', 'Our Services - Buy, Sell & Rent Properties | Lovely Associates');
    updateOrCreateMetaTag('twitter:description', 'Comprehensive real estate services in East Delhi. Buy, sell, and rent residential & commercial properties.');
    updateOrCreateMetaTag('twitter:image', 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1200');

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
      "@type": "Service",
      "name": "Real Estate Services",
      "provider": {
        "@type": "RealEstateAgent",
        "name": "Lovely Associates"
      },
      "serviceType": [
        "Property Sales",
        "Property Purchase", 
        "Property Rental",
        "Real Estate Consultation"
      ],
      "areaServed": "East Delhi, India",
      "description": "Comprehensive real estate services including buying, selling, and renting residential and commercial properties"
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

  const services = [
    {
      icon: Home,
      title: 'Buy Property',
      description: 'Browse properties for sale across East Delhi\'s most reputed localities.',
      features: [
        'Verified property listings',
        'Legal documentation support',
        'Market price analysis',
        'Site visits and inspections',
        'Loan assistance guidance'
      ],
      color: 'blue',
      image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Building,
      title: 'Sell Property',
      description: 'We help you get the right value for your property with verified buyers.',
      features: [
        'Property valuation',
        'Marketing and promotion',
        'Buyer verification',
        'Negotiation support',
        'Complete documentation'
      ],
      color: 'green',
      image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Key,
      title: 'Rent / Lease',
      description: 'Need tenants or rental flats? We manage both residential and commercial listings.',
      features: [
        'Tenant screening',
        'Rental agreements',
        'Property management',
        'Maintenance coordination',
        'Rent collection support'
      ],
      color: 'purple',
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-100',
          icon: 'text-blue-800',
          button: 'bg-blue-800 hover:bg-blue-900',
          accent: 'text-blue-800'
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          icon: 'text-green-800',
          button: 'bg-green-800 hover:bg-green-900',
          accent: 'text-green-800'
        };
      case 'purple':
        return {
          bg: 'bg-purple-100',
          icon: 'text-purple-800',
          button: 'bg-purple-800 hover:bg-purple-900',
          accent: 'text-purple-800'
        };
      default:
        return {
          bg: 'bg-gray-100',
          icon: 'text-gray-800',
          button: 'bg-gray-800 hover:bg-gray-900',
          accent: 'text-gray-800'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Comprehensive real estate solutions designed to meet all your property needs in East Delhi
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color);
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className={`${colors.bg} w-20 h-20 rounded-2xl flex items-center justify-center mb-6`}>
                      <service.icon className={`h-10 w-10 ${colors.icon}`} />
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h2>
                    
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className={`h-5 w-5 ${colors.accent} flex-shrink-0`} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/contact"
                      className={`inline-flex items-center space-x-2 ${colors.button} text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>

                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Lovely Associates?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence and client satisfaction sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">20+ Years Experience</h3>
              <p className="text-gray-600">
                Two decades of expertise in East Delhi's real estate market
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">500+ Happy Clients</h3>
              <p className="text-gray-600">
                Hundreds of satisfied families have found their dream homes with us
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trusted Service</h3>
              <p className="text-gray-600">
                Transparent dealings and personalized service you can rely on
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact us today to discuss your real estate needs
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Contact Us Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;