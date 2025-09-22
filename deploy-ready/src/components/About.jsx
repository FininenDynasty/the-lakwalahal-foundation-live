import React from 'react';
import { Heart, Shield, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { foundationData } from '../data/mock';

const About = () => {
  const { about } = foundationData;
  
  const iconMap = {
    Heart: Heart,
    Shield: Shield,
    Star: Star
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            {about.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {about.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {about.values.map((value, index) => {
            const Icon = iconMap[value.icon];
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;