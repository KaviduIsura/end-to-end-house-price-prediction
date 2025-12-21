import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Property Search', href: '/listings' },
        { label: 'Price Prediction', href: '/predict' },
        { label: 'AI Valuation', href: '/valuation' },
        { label: 'Market Analysis', href: '/analysis' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-dark-950 text-white border-t border-dark-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-xl">
                <Building2 size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">EstateAI</h2>
                <p className="text-gray-400 text-sm">Intelligent Real Estate</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Revolutionizing real estate with artificial intelligence. 
              Find, predict, and purchase properties smarter.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-400" size={20} />
                <span className="text-gray-400">hello@estateai.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-primary-400" size={20} />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary-400" size={20} />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} EstateAI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Powered by Artificial Intelligence and Machine Learning
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;