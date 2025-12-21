import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, User } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">
            Have questions? Our team is here to help you with all your real estate needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-xl bg-primary-500/10 mr-4">
                <MessageSquare className="text-primary-500" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Send us a Message</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll respond within 24 hours
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label-text">
                    <User size={16} className="inline mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="label-text">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label-text">Subject</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="label-text">Your Message</label>
                <textarea
                  className="input-field min-h-[150px] resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                <Send className="mr-2" size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <Mail className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">hello@estateai.com</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      For general inquiries and support
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <Phone className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Monday to Friday, 9am to 6pm PST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <MapPin className="text-purple-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Office</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Tech Street<br />
                      San Francisco, CA 94107
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Visit us by appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How accurate are your price predictions?',
                    a: 'Our AI achieves 95% accuracy based on historical data.',
                  },
                  {
                    q: 'Is there a fee for using your service?',
                    a: 'Basic features are free. Premium features require subscription.',
                  },
                  {
                    q: 'How do I list my property?',
                    a: 'Contact our team or use our property listing dashboard.',
                  },
                ].map((faq, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gray-50 dark:bg-dark-800">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;