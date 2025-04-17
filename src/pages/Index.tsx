
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import UploadArea from '@/components/UploadArea';
import HowItWorks from '@/components/HowItWorks';
import RecentFixes from '@/components/RecentFixes';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Upload Section First */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Get AI-Powered Repair Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simply take a photo of what needs fixing, upload it, and our AI will provide instant repair guidance
            </p>
          </div>
          
          <UploadArea />
        </div>
      </section>
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Recent Fixes Section */}
      <RecentFixes />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-fixmystuff-teal to-blue-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Stuff with AI?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Get instant repair solutions powered by artificial intelligence.
              Save money and help the environment by fixing instead of replacing!
            </p>
            
            <Button 
              size="lg" 
              className="bg-white text-fixmystuff-teal hover:bg-white/90 shadow-lg shadow-black/10"
            >
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
