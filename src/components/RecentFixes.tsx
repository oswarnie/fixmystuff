
import React from 'react';
import { ExternalLink, ThumbsUp, MessageSquare, Tool } from 'lucide-react';

type FixItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  comments: number;
  fixedBy: string;
};

const DEMO_FIXES: FixItem[] = [
  {
    id: 1,
    title: "Fixed broken headphone jack",
    description: "The headphone jack was loose and wouldn't connect properly. I used a small precision screwdriver to tighten the internal connection.",
    imageUrl: "https://images.unsplash.com/photo-1563770660941-10b3dc49f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 42,
    comments: 8,
    fixedBy: "AudioRepairGuru"
  },
  {
    id: 2,
    title: "Repaired leaky kitchen faucet",
    description: "The faucet was dripping constantly. Replaced the worn-out washer and now it works like new without wasting water.",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 37,
    comments: 5,
    fixedBy: "PlumbingPro"
  },
  {
    id: 3,
    title: "Fixed flickering ceiling light",
    description: "The light was flickering due to a loose wire connection. I turned off the power, tightened the connection, and now it's stable.",
    imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    likes: 29,
    comments: 3,
    fixedBy: "ElectricalWhiz"
  }
];

const RecentFixes = () => {
  return (
    <div className="py-12 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Recent Community Fixes</h2>
          <a href="/community" className="text-fixmystuff-teal hover:text-fixmystuff-teal/80 flex items-center gap-1 transition-colors">
            View all <ExternalLink size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_FIXES.map((fix, index) => (
            <div 
              key={fix.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all hover:shadow-lg group animate-pop-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={fix.imageUrl} 
                  alt={fix.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <Tool size={12} />
                    <span>Fixed!</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{fix.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{fix.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>{fix.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      <span>{fix.comments}</span>
                    </div>
                  </div>
                  <div className="text-xs text-fixmystuff-orange">Fixed by {fix.fixedBy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentFixes;
