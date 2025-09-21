import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { foundationData } from '../data/mock';

const Events = () => {
  const { events } = foundationData;

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join us in person for healing ceremonies, workshops, and community gatherings
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center text-blue-600 mb-4">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-medium">{event.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {event.title}
                </h3>
                
                <div className="flex items-center text-slate-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {event.description}
                </p>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 transition-all duration-300"
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;