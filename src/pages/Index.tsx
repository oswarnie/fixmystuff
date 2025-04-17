
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import UploadArea from '@/components/UploadArea';
import HowItWorks from '@/components/HowItWorks';
import RecentFixes from '@/components/RecentFixes';
import Footer from '@/components/Footer';
import { ArrowRight, MessagesSquare, Lightbulb, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCTAClick = () => {
    if (user) {
      // If logged in, scroll to upload area
      const uploadArea = document.getElementById('upload-area');
      if (uploadArea) {
        uploadArea.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not logged in, redirect to signup
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Navbar />
      
      {/* Upload Section First */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Get AI-Powered Repair Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              Simply take a photo of what needs fixing, and our AI will provide instant repair guidance
            </p>
          </div>
          
          <UploadArea />
        </div>
      </section>
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Recent Fixes */}
      <RecentFixes />
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-fixmystuff-teal to-blue-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Stuff Instantly?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Get instant repair solutions powered by artificial intelligence.
              Save time and money by fixing instead of replacing!
            </p>
            
            <Button 
              size="lg" 
              className="bg-white text-fixmystuff-teal hover:bg-white/90 shadow-lg shadow-black/10"
              onClick={handleCTAClick}
            >
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Common Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Quick answers to your repair-related questions</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How accurate are the AI solutions?",
                answer: "Our AI is trained on millions of repair cases and provides highly accurate, step-by-step solutions tailored to your specific problem."
              },
              {
                question: "What types of items can I get help with?",
                answer: "From electronics to furniture, appliances to toys - if you can take a photo of it, our AI can help you fix it."
              },
              {
                question: "How fast will I get a solution?",
                answer: "Instantly! Our AI analyzes your photo and provides immediate repair guidance, no waiting required."
              },
              {
                question: "Is it safe to follow AI repair advice?",
                answer: "Our AI provides safety warnings and prerequisites for each repair, ensuring you can fix items safely and effectively."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-700 transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Real-World Applications</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">See how our AI helps in different scenarios</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wrench className="h-8 w-8 text-fixmystuff-teal" />,
                title: "Home Repairs",
                description: "From fixing leaky faucets to repairing furniture, get instant solutions for common household issues."
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-fixmystuff-orange" />,
                title: "Electronics",
                description: "Troubleshoot and repair your devices with AI-guided instructions and safety precautions."
              },
              {
                icon: <MessagesSquare className="h-8 w-8 text-blue-500" />,
                title: "DIY Projects",
                description: "Get expert guidance for your DIY repairs and improvements with step-by-step solutions."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center p-6 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={handleCTAClick}
              >
                <div className="inline-flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-fixmystuff-teal dark:text-fixmystuff-teal"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCTAClick();
                  }}
                >
                  Try Now <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
