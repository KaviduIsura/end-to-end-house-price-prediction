import React from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import { ArrowRight, Search, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredProperties = [
    {
    id: 1,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    title: 'Luxury Villa in Whitefield',
    location: 'Whitefield, Bangalore',
    price: 35000000, // ₹3.5 Cr
    pricePerSqft: '₹9,500/sqft',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,600 sqft',
    type: 'For Sale',
    aiMatch: 98,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    title: 'Premium Apartment near MG Road',
    location: 'MG Road, Bangalore',
    price: 28000000, // ₹2.8 Cr
    pricePerSqft: '₹14,000/sqft',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,000 sqft',
    type: 'For Sale',
    aiMatch: 96,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    title: 'Lake View Villa in Hebbal',
    location: 'Hebbal, Bangalore',
    price: 42000000, // ₹4.2 Cr
    pricePerSqft: '₹10,500/sqft',
    bedrooms: 5,
    bathrooms: 5,
    area: '4,000 sqft',
    type: 'For Sale',
    aiMatch: 97,
  }
  ];

  const features = [
    {
      icon: <Search size={32} />,
      title: 'Smart Search',
      description: 'AI-powered property matching based on your preferences',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Price Predictions',
      description: 'Accurate market valuations using machine learning',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure Transactions',
      description: 'Blockchain-verified property transactions',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <>
      <Hero />
      
      {/* Featured Properties */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="section-title">Featured Properties</h2>
              <p className="section-subtitle">Curated selections with AI-verified prices</p>
            </div>
            <Link to="/listings" className="btn-outline inline-flex items-center">
              View All <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Home Sage</h2>
            <p className="section-subtitle">Revolutionizing real estate with technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className={`inline-flex p-4 rounded-2xl ${feature.bgColor} mb-6`}>
                  <div className={feature.color}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers using AI to make smarter real estate decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/predict" className="btn-primary">
              Try Price Predictor
            </Link>
            <Link to="/contact" className="btn-outline !text-white !border-white/30">
              Contact Our Agents
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;