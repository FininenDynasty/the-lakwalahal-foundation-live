import React, { useState } from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { foundationData } from '../data/mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const { contact } = foundationData;
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold">Lakwalahal Foundation</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              No one forgotten. Everyone protected. A legacy of healing, protection, and sacred remembrance.
            </p>
            <div className="text-sm text-slate-400">
              <strong>501(c)(3) Status Pending</strong><br />
              Tax-deductible donations coming soon!
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-300">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#programs" className="hover:text-blue-400 transition-colors">Programs</a></li>
              <li><a href="#team" className="hover:text-blue-400 transition-colors">Our Team</a></li>
              <li><a href="#impact" className="hover:text-blue-400 transition-colors">Our Impact</a></li>
              <li><a href="#events" className="hover:text-blue-400 transition-colors">Events</a></li>
              <li><a href="#donate" className="hover:text-blue-400 transition-colors">Get Involved</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{contact.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">{contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                <span className="text-sm">{contact.email}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4">Join Our Sacred Circle</h4>
            <p className="text-slate-300 mb-6">Sign up to receive updates, blessings, and community calls to action</p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubscribing}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {subscribeMessage && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  subscribeMessage.includes('error') || subscribeMessage.includes('Sorry') 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {subscribeMessage}
                </div>
              )}
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 The Lakwalahal Foundation. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400 transition-colors">Transparency</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;