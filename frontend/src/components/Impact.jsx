import React from 'react';
import { Card, CardContent } from './ui/card';
import { foundationData } from '../data/mock';

const Impact = () => {
  const { impact } = foundationData;

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Our Impact
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Together, we're creating ripples of healing that transform communities
          </p>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {impact.stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Success Stories */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-6">
            Stories of Healing
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {impact.stories.map((story, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <div className="h-48 bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                <div className="text-6xl text-rose-600 opacity-20">💝</div>
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-slate-800 mb-4">
                  {story.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {story.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;