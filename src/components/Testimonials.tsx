
import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "DIY Enthusiast",
    content: "fixmystuff.io saved me hundreds of dollars! My washing machine was making a weird noise, and someone from the community helped me diagnose and fix a simple part issue in just minutes.",
    stars: 5,
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    content: "I was ready to throw away my favorite lamp, but the community helped me identify a simple wiring issue. Now it works perfectly again. This site is amazing for reducing waste!",
    stars: 5,
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: 3,
    name: "Jamie Roberts",
    role: "Small Business Owner",
    content: "As someone who runs a small cafe, equipment repairs can be costly. The fixmystuff community helped me repair our espresso machine and saved us a week of downtime.",
    stars: 5,
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">What Our Community Says</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of people who've already saved money and reduced waste by fixing instead of replacing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-xl p-6 relative card-shadow animate-pop-in hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-fixmystuff-teal flex items-center justify-center text-white shadow-lg">
                <Quote size={18} />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-fixmystuff-teal" 
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
