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
    <footer className="text-white border-t bg-dark-950 border-dark-800">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center mb-6 space-x-3">
              <div className="p-2rounded-xl">
                <img 
        src="/logo.png" 
        alt="Home Sage Logo" 
        className="w-auto h-16" 
        
      />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Home Sage</h2>
                <p className="text-sm text-gray-400">Intelligent Real Estate</p>
              </div>
            </Link>
            <p className="mb-6 text-gray-400">
              Revolutionizing real estate with artificial intelligence. 
              Find, predict, and purchase properties smarter.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 transition-colors rounded-lg bg-dark-800 hover:bg-dark-700"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-lg font-semibold">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 transition-colors hover:text-white"
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
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-primary-400" size={20} />
                <span className="text-gray-400">hello@Home Sage.com</span>
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

        <div className="pt-8 text-center border-t border-dark-800">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Home Sage. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Powered by Artificial Intelligence and Machine Learning
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;