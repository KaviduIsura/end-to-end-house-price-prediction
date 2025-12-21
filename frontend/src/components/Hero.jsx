import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Zap, Building2, Calculator } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative gradient-bg pt-24 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 dark:bg-dark-800/50 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-pulse-slow">
            <Sparkles className="text-yellow-400" size={16} />
            <span className="text-sm font-semibold text-white">
              AI-Powered Real Estate Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-400 via-white to-primary-400 bg-clip-text text-transparent">
              Find Your Dream
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-primary-300 to-white bg-clip-text text-transparent">
              Home with AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Discover, predict, and purchase properties with artificial intelligence. 
            Get accurate price predictions and find perfect matches in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/listings" className="btn-primary inline-flex items-center justify-center group">
              Browse Properties
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/predict" className="btn-outline inline-flex items-center justify-center">
              Predict Price
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: '10K+', label: 'Properties Listed', icon: <Building2 /> },
              { value: '95%', label: 'Accuracy Rate', icon: <Shield /> },
              { value: '2M+', label: 'Predictions Made', icon: <Calculator /> },
              { value: '24/7', label: 'AI Support', icon: <Zap /> },
            ].map((stat, index) => (
              <div key={index} className="glass-effect rounded-2xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-lg bg-primary-500/20">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;