import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Shield, Users, Calendar, CreditCard, DollarSign } from 'lucide-react';

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');

  const suggestedAmounts = [25, 50, 100, 250, 500];

  const handleDonateClick = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount && amount > 0) {
      // TODO: Integrate with payment processor (Stripe/PayPal)
      alert(`Thank you for your intention to donate $${amount}! Payment processing will be available once our 501(c)(3) status is approved.`);
    } else {
      alert('Please select or enter a donation amount.');
    }
  };

  const ways = [
    {
      icon: Heart,
      title: "Monthly Giving",
      description: "Provide ongoing support with a recurring monthly donation",
      cta: "Start Monthly Gift",
      action: () => setDonationType('monthly')
    },
    {
      icon: Shield,
      title: "One-Time Donation", 
      description: "Make a single donation to support our current programs",
      cta: "Donate Now",
      action: () => setDonationType('one-time')
    },
    {
      icon: Users,
      title: "Volunteer",
      description: "Share your time and skills to directly impact our community",
      cta: "Join Our Team",
      action: () => window.location.href = '#contact'
    },
    {
      icon: Calendar,
      title: "Corporate Partnership",
      description: "Partner with us for ongoing community impact initiatives",
      cta: "Learn More",
      action: () => window.location.href = '#contact'
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
        
        {/* Donation Amount Selection */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <DollarSign className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Make a Direct Impact</h3>
                <p className="text-blue-100">Every donation helps us continue our mission of healing and protection</p>
              </div>

              {/* Donation Type Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/20 rounded-full p-1">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={`px-6 py-2 rounded-full transition-all ${
                      donationType === 'one-time' 
                        ? 'bg-white text-blue-800 font-semibold' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={`px-6 py-2 rounded-full transition-all ${
                      donationType === 'monthly' 
                        ? 'bg-white text-blue-800 font-semibold' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedAmount === amount
                        ? 'border-white bg-white text-blue-800 font-bold'
                        : 'border-white/30 text-white hover:border-white/50 hover:bg-white/10'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <div className="max-w-xs mx-auto">
                  <label className="block text-white mb-2 text-center">Or enter custom amount:</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <div className="text-center">
                <Button
                  onClick={handleDonateClick}
                  size="lg"
                  className="bg-white text-blue-800 hover:bg-blue-50 px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Donate {donationType === 'monthly' ? 'Monthly' : 'Now'}
                  {(selectedAmount || customAmount) && ` $${selectedAmount || customAmount}`}
                </Button>
                <p className="text-white/80 text-sm mt-4">
                  Secure donation processing • 501(c)(3) status pending
                </p>
              </div>
            </CardContent>
          </Card>
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
                    onClick={way.action}
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