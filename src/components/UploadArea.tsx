
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Image, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const UploadArea = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [solution, setSolution] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    setUploadedImage(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
      return;
    }
    
    const file = e.dataTransfer.files[0];
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    setUploadedImage(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setDescription('');
    setSolution('');
  };

  const handleSubmit = async () => {
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to submit a fix request",
        variant: "destructive"
      });
      return;
    }
    
    if (!uploadedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image of the item that needs fixing",
        variant: "destructive"
      });
      return;
    }
    
    if (description.trim() === '') {
      toast({
        title: "Description required",
        description: "Please describe the issue you're experiencing",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Upload image to Supabase storage
      const fileExt = uploadedImage.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('fix_images')
        .upload(`public/${fileName}`, uploadedImage);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('fix_images')
        .getPublicUrl(`public/${fileName}`);
      
      // Generate AI solution (simulated here - would be replaced with actual AI integration)
      setIsProcessing(true);
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a simulated AI solution (would be replaced with actual Gemini AI API call)
      const aiSolution = generateMockSolution(description);
      setSolution(aiSolution);
      
      // Store the fix request in the database
      const { error: insertError } = await supabase
        .from('fix_requests')
        .insert({
          user_id: session.user.id,
          title: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
          description: description,
          image_url: urlData.publicUrl,
          ai_solution: aiSolution,
          status: 'completed'
        });
      
      if (insertError) throw insertError;
      
      toast({
        title: "Solution generated!",
        description: "Your repair solution is ready.",
      });
      
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  // Simulated solution generator - would be replaced with Gemini AI
  const generateMockSolution = (description: string) => {
    const solutions = [
      `Based on the image and your description: "${description.substring(0, 30)}...", here's how to fix it:\n\n1. Unplug the device and wait 30 seconds\n2. Remove the back panel using a Phillips screwdriver\n3. Check for loose connections or damaged components\n4. Reconnect any loose cables\n5. Replace the back panel and power on the device`,
      
      `After analyzing your item with the description: "${description.substring(0, 30)}...", I recommend:\n\n1. Clean the affected area with isopropyl alcohol\n2. Allow to dry completely (approximately 10 minutes)\n3. Apply adhesive to the broken section\n4. Hold firmly for 60 seconds\n5. Let cure for 24 hours before using`,
      
      `To fix this issue described as: "${description.substring(0, 30)}...", follow these steps:\n\n1. Reset the system by holding the power button for 10 seconds\n2. Update the firmware to the latest version\n3. Clear the cache by navigating to Settings > Storage > Clear Cache\n4. Restart the device\n5. If the problem persists, check for hardware damage`,
      
      `For your problem described as: "${description.substring(0, 30)}...", the solution is:\n\n1. Check if the item is properly connected to power\n2. Inspect for visible damage to the exterior\n3. Test with an alternative power source\n4. Reset to factory settings using the pinhole reset button\n5. If these steps don't resolve the issue, the internal component may need replacement`
    ];
    
    // Return a random solution from the array
    return solutions[Math.floor(Math.random() * solutions.length)];
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div 
          className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
            imagePreview ? 'border-fixmystuff-teal bg-fixmystuff-teal/5' : 'border-gray-300 hover:border-fixmystuff-teal'
          } animate-fade-in`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!imagePreview ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-fixmystuff-teal/10 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-fixmystuff-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Upload a photo</h3>
              <p className="text-gray-600 text-center mb-6 max-w-md">
                Take a photo of anything you want to fix—a broken item, a screenshot of an error message, or a household problem
              </p>
              
              <Button
                className="relative overflow-hidden bg-fixmystuff-teal hover:bg-fixmystuff-teal/90"
              >
                <Image className="mr-2 h-4 w-4" />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                Or drag and drop an image file here
              </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex justify-end mb-2">
                <button
                  onClick={resetUpload}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-700" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={imagePreview}
                      alt="Upload preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2 text-gray-700">
                    Describe the issue
                  </label>
                  <Textarea
                    placeholder="What's wrong with this item? What would you like to fix?"
                    className="min-h-[120px] mb-4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={isUploading || description.trim() === ''}
                    className="ml-auto bg-fixmystuff-teal hover:bg-fixmystuff-teal/90"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Get Repair Solution</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Upload Any Problem",
              description: "Photograph broken items, take screenshots of errors, or snap household issues",
              icon: <Image className="h-5 w-5 text-white" />
            },
            {
              title: "AI Analyzes It",
              description: "Our AI instantly processes your image and problem description",
              icon: <Loader2 className="h-5 w-5 text-white" />
            },
            {
              title: "Get Instant Solution",
              description: "Receive detailed step-by-step instructions to fix it yourself",
              icon: <CheckCircle className="h-5 w-5 text-white" />
            }
          ].map((item, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md animate-pop-in">
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    index === 0 ? 'bg-fixmystuff-teal' : index === 1 ? 'bg-fixmystuff-orange' : 'bg-green-500'
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Your AI Repair Solution</DialogTitle>
            <DialogDescription>
              Follow these steps to fix your item
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              {imagePreview && (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={imagePreview} 
                    alt="Your item" 
                    className="w-full h-auto" 
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold text-green-800">AI Solution Generated</h3>
                </div>
                <div className="text-gray-700 whitespace-pre-line">
                  {solution}
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadArea;
