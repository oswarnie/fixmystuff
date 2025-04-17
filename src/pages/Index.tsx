
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
      
      {/* Hero Section */}
      <Hero />
      
      {/* Upload Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Upload & Get Your Fix</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a photo of what needs fixing, upload it, and our community will help you repair it
            </p>
          </div>
          
          <UploadArea />
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Community Fixes Section */}
      <RecentFixes />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-fixmystuff-teal to-blue-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Stuff?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join our community today and start fixing things instead of replacing them.
              It's better for your wallet and better for the planet!
            </p>
            
            <Button 
              size="lg" 
              className="bg-white text-fixmystuff-teal hover:bg-white/90 shadow-lg shadow-black/10"
            >
              Get Started Now
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
