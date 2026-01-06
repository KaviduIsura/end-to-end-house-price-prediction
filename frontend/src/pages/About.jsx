import React from 'react';
import { Users, Target, Globe, Award, CheckCircle } from 'lucide-react';

const About = () => {
  const team = [
    { name: 'Sarah Chen', role: 'AI Research Lead', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786' },
    { name: 'Marcus Rodriguez', role: 'Real Estate Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { name: 'Priya Sharma', role: 'Data Scientist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
    { name: 'James Wilson', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Started with a vision to revolutionize real estate' },
    { year: '2021', title: 'AI Launch', description: 'Released first AI prediction model' },
    { year: '2022', title: '10K Users', description: 'Reached milestone of 10,000 active users' },
    { year: '2023', title: 'Series B', description: 'Raised $50M in funding' },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="section-title">About Home Sage</h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            We're revolutionizing the real estate industry with artificial intelligence, 
            making property transactions smarter, faster, and more transparent.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-6">
              <Target className="text-blue-500" size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To democratize access to accurate real estate information and 
              empower everyone to make informed property decisions through 
              AI-powered insights.
            </p>
            <ul className="space-y-3">
              {[
                'Accurate price predictions',
                'Transparent market data',
                'AI-powered recommendations',
                'Secure transactions',
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="inline-flex p-3 rounded-xl bg-purple-500/10 mb-6">
              <Globe className="text-purple-500" size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We envision a future where every property transaction is backed 
              by intelligent insights, where market inefficiencies are eliminated, 
              and where finding the perfect home is as simple as asking an AI.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <p className="font-semibold">
                "Making real estate intelligent, one prediction at a time."
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-xl bg-primary-500/10 mb-4">
              <Users className="text-primary-500" size={32} />
            </div>
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">
              Experts in AI, real estate, and technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary-500 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Leading innovation in {member.role.toLowerCase()} with expertise.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="card">
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-xl bg-green-500/10 mb-4">
              <Award className="text-green-500" size={32} />
            </div>
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">Key milestones in our growth</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-900">
                <div className="text-4xl font-bold text-primary-500 mb-2">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;