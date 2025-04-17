
import React from 'react';
import { ArrowRight, Wrench, Sparkles, Zap } from 'lucide-react';
import Screwdriver from './Screwdriver';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-fixmystuff-teal/10 rounded-full animate-spin-slow"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-fixmystuff-orange/10 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 right-20 w-20 h-20 bg-blue-500/10 rounded-full animate-bounce-light"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-fixmystuff-teal/10 text-fixmystuff-teal mb-6">
              <Zap className="mr-1 h-3.5 w-3.5" />
              <span>AI-powered instant solutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Get an instant solution and <span className="gradient-text">fix your stuff</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Upload a photo of your broken item and get instant, AI-powered repair instructions. Save time and money with smart solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-fixmystuff-teal hover:bg-fixmystuff-teal/90 shadow-lg shadow-fixmystuff-teal/25">
                Upload & Fix Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-fixmystuff-teal text-fixmystuff-teal hover:bg-fixmystuff-teal/10">
                Browse Community Fixes
              </Button>
            </div>
            
            <div className="mt-8 flex items-center text-gray-500 text-sm">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-fixmystuff-teal flex items-center justify-center text-white">J</div>
                <div className="w-8 h-8 rounded-full bg-fixmystuff-orange flex items-center justify-center text-white">S</div>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">M</div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">+</div>
              </div>
              <span>Joined by 10,000+ fixers from around the world</span>
            </div>
          </div>
          
          <div className="mt-12 md:mt-0 md:w-5/12 animate-slide-up">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden card-shadow">
                {/* We'll use a placeholder image here, but in a real app you'd use a relevant image */}
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Person repairing electronics"
                  className="w-full h-auto"
                />
                
                {/* Floating repair indicators */}
                <div className="absolute top-6 left-6 glass-card p-3 animate-pop-in">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Wrench className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">Fixed today</div>
                      <div className="text-sm font-bold">47 items</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 right-6 glass-card p-3 animate-pop-in delay-300">
                  <div className="text-xs font-medium">Success rate</div>
                  <div className="text-sm font-bold text-green-600">94%</div>
                </div>
              </div>
              
              {/* Animated tool icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-fixmystuff-orange rounded-full flex items-center justify-center shadow-lg animate-bounce-light">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-fixmystuff-teal rounded-full flex items-center justify-center shadow-lg animate-pulse-light">
                <Screwdriver className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
