import React from 'react';
import { Card, CardContent } from './ui/card';
import { foundationData } from '../data/mock';

const Programs = () => {
  const { programs } = foundationData;

  return (
    <section id="programs" className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Our Programs
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive support services designed to heal communities and protect the vulnerable
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0">
              <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <div className="text-6xl text-blue-600 opacity-20">📿</div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {program.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;