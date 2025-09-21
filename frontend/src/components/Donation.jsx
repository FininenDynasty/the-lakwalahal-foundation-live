import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Shield, Users, Calendar } from 'lucide-react';

const Donation = () => {
  const ways = [
    {
      icon: Heart,
      title: "Monthly Giving",
      description: "Provide ongoing support with a recurring monthly donation",
      cta: "Start Monthly Gift"
    },
    {
      icon: Shield,
      title: "One-Time Donation", 
      description: "Make a single donation to support our current programs",
      cta: "Donate Now"
    },
    {
      icon: Users,
      title: "Volunteer",
      description: "Share your time and skills to directly impact our community",
      cta: "Join Our Team"
    },
    {
      icon: Calendar,
      title: "Corporate Partnership",
      description: "Partner with us for ongoing community impact initiatives",
      cta: "Learn More"
    }
  ];

  return (
    <section id="donate" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Join Our Mission of Healing
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Your support helps us ensure no one is forgotten and everyone is protected
          </p>
          
          <div className="bg-amber-100 text-amber-800 px-6 py-4 rounded-lg inline-block">
            <strong>501(c)(3) Status Pending:</strong> Tax-deductible donations coming soon!
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ways.map((way, index) => {
            const Icon = way.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    {way.title}
                  </h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    {way.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-white/50 text-white hover:bg-white hover:text-blue-800 transition-all duration-300 w-full"
                  >
                    {way.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <div className="text-lg text-blue-100 mb-6">
            Every contribution, no matter the size, creates ripples of healing in our community
          </div>
          <Button 
            size="lg"
            className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Involved Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Donation;