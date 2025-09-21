import React from 'react';
import { Card, CardContent } from './ui/card';
import { foundationData } from '../data/mock';

const Team = () => {
  const { team } = foundationData;

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Our Leadership Team
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated professionals committed to healing, protection, and sacred remembrance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="text-4xl text-blue-600">👤</div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-medium mb-4">
                  {member.role}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;