
import React from 'react';
import { Upload, Zap, Wrench, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="h-10 w-10 text-white" />,
    title: "Upload Your Problem",
    description: "Take a photo of the item that needs fixing and upload it to our platform.",
    color: "bg-fixmystuff-teal",
    delay: "delay-100"
  },
  {
    icon: <Zap className="h-10 w-10 text-white" />,
    title: "Instant Solution",
    description: "Our AI instantly analyzes the image and provides detailed repair instructions.",
    color: "bg-fixmystuff-orange",
    delay: "delay-200"
  },
  {
    icon: <Wrench className="h-10 w-10 text-white" />,
    title: "Follow Instructions",
    description: "Get step-by-step guidance with clear visuals and safety precautions.",
    color: "bg-blue-500",
    delay: "delay-300"
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-white" />,
    title: "Problem Solved",
    description: "Fix your item quickly and effectively with AI-powered solutions.",
    color: "bg-green-500",
    delay: "delay-400"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your broken items fixed with help from our community in four easy steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`animate-pop-in ${step.delay} flex flex-col items-center text-center`}
            >
              <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
