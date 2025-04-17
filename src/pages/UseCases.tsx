
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Wrench, Smartphone, Monitor, Home, Car, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const useCaseCategories = [
  {
    title: "Electronics Repair",
    icon: <Smartphone className="h-12 w-12 text-fixmystuff-teal" />,
    description: "Get instant solutions for smartphones, laptops, tablets, and other electronic devices that aren't working properly.",
    examples: [
      "Cracked smartphone screen",
      "Laptop not turning on", 
      "TV with display issues",
      "Bluetooth headphones not pairing",
      "Gaming console errors"
    ]
  },
  {
    title: "Software & Online Issues",
    icon: <Monitor className="h-12 w-12 text-fixmystuff-orange" />,
    description: "Simply take a screenshot of your software issue or error message and get an immediate solution to fix it.",
    examples: [
      "Application error messages",
      "Website not loading correctly",
      "Software installation problems",
      "Operating system glitches",
      "File conversion issues"
    ]
  },
  {
    title: "Home Repairs",
    icon: <Home className="h-12 w-12 text-blue-500" />,
    description: "From leaky faucets to furniture assembly, get step-by-step guidance for common household repair needs.",
    examples: [
      "Dripping faucet or showerhead",
      "Clogged drain problems",
      "Broken furniture pieces",
      "Wall or ceiling damage",
      "Loose cabinet handles or hinges"
    ]
  },
  {
    title: "Automotive Fixes",
    icon: <Car className="h-12 w-12 text-green-500" />,
    description: "Simple automotive issues can often be resolved without a mechanic. Upload a photo for quick diagnostics.",
    examples: [
      "Dashboard warning lights",
      "Minor exterior scratches",
      "Interior component issues",
      "Battery or fuse problems",
      "Windshield wiper replacement"
    ]
  }
];

const UseCases = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-fixmystuff-teal/10 to-blue-500/10 dark:bg-gradient-to-r dark:from-fixmystuff-teal/20 dark:to-blue-500/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mx-auto max-w-3xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
                Fix Anything with AI Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8 dark:text-gray-300">
                Our AI can analyze photos of virtually any broken item or issue and provide instant, 
                tailored instructions to help you fix it yourself.
              </p>
              <Button 
                className="bg-fixmystuff-teal hover:bg-fixmystuff-teal/90 text-white shadow-lg shadow-fixmystuff-teal/25"
                onClick={() => navigate('/')}
                size="lg"
              >
                Upload & Fix Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Use Cases Grid */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                What Can You Fix?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
                Take a photo of anything that needs fixing—from broken gadgets to error messages—and get 
                immediate solutions tailored to your specific problem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {useCaseCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl animate-pop-in"
                >
                  <div className="p-8">
                    <div className="flex items-start mb-6">
                      <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 mr-4">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{category.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">Common Examples:</h4>
                      <ul className="space-y-2">
                        {category.examples.map((example, i) => (
                          <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-fixmystuff-teal mr-2"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-fixmystuff-teal dark:bg-fixmystuff-teal/90">
          <div className="container mx-auto max-w-5xl text-center text-white">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Problem?</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
                Stop struggling with broken items. Get instant AI-powered repair instructions
                and fix it yourself in minutes!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-fixmystuff-teal hover:bg-white/90"
                  onClick={() => navigate('/')}
                >
                  Upload & Get Solution
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UseCases;
