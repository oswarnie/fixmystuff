
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Image, Loader2, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const UploadArea = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [solution, setSolution] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dropAreaRef = useRef<HTMLDivElement>(null);
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

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set dragging to false if we're leaving the drop area completely
    const rect = dropAreaRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX;
      const y = e.clientY;
      
      if (
        x <= rect.left || 
        x >= rect.right || 
        y <= rect.top || 
        y >= rect.bottom
      ) {
        setIsDragging(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
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

  const resetUpload = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setDescription('');
    setSolution('');
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleSubmit = async () => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to submit a fix request",
        variant: "destructive"
      });
      navigate('/login');
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
      
      // Generate AI solution using edge function
      setIsProcessing(true);
      
      const { data, error } = await supabase.functions.invoke('generate-solution', {
        body: {
          description: description,
          imageUrl: urlData.publicUrl
        }
      });
      
      if (error) throw error;
      
      setSolution(data.solution);
      
      // Store the fix request in the database
      const { error: insertError } = await supabase
        .from('fix_requests')
        .insert({
          user_id: user.id,
          title: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
          description: description,
          image_url: urlData.publicUrl,
          ai_solution: data.solution,
          status: 'completed'
        });
      
      if (insertError) throw insertError;
      
      toast({
        title: "Solution generated!",
        description: "Your repair solution is ready.",
      });
      
      setIsDialogOpen(true);
    } catch (error: any) {
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

  const redirectToSignup = () => {
    if (!user) {
      navigate('/signup');
    } else {
      // If already logged in, scroll to upload area
      const uploadArea = document.getElementById('upload-area');
      if (uploadArea) {
        uploadArea.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div id="upload-area" className="max-w-3xl mx-auto">
        <div 
          ref={dropAreaRef}
          className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
            isDragging 
              ? 'border-fixmystuff-teal bg-fixmystuff-teal/10 scale-[1.02] shadow-lg' 
              : imagePreview 
                ? 'border-fixmystuff-teal bg-fixmystuff-teal/5' 
                : 'border-gray-300 hover:border-fixmystuff-teal'
          } animate-fade-in`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {!imagePreview ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-fixmystuff-teal/10 rounded-full flex items-center justify-center mb-4">
                <Upload className={`h-8 w-8 text-fixmystuff-teal ${isDragging ? 'animate-bounce' : ''}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Upload a photo</h3>
              <p className="text-gray-600 text-center mb-6 max-w-md dark:text-gray-300">
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
              
              <p className="text-sm text-gray-500 mt-4 dark:text-gray-400">
                Or drag and drop an image file here
              </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex justify-end mb-2">
                <button
                  onClick={resetUpload}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
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
                  <label className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Describe the issue
                  </label>
                  <Textarea
                    placeholder="What's wrong with this item? What would you like to fix?"
                    className="min-h-[120px] mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
            <Card key={index} className="overflow-hidden border-none shadow-md animate-pop-in dark:bg-gray-800">
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    index === 0 ? 'bg-fixmystuff-teal' : index === 1 ? 'bg-fixmystuff-orange' : 'bg-green-500'
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`max-w-5xl ${isFullScreen ? 'fixed inset-4 h-[calc(100vh-2rem)]' : ''}`}>
          <DialogHeader className="flex flex-row justify-between items-start">
            <div>
              <DialogTitle className="dark:text-white">Your AI Repair Solution</DialogTitle>
              <DialogDescription className="dark:text-gray-300">
                Follow these steps to fix your item
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleFullScreen}
                className="dark:border-gray-600 dark:text-white"
              >
                {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="dark:border-gray-600 dark:text-white"
              >
                {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </Button>
            </div>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              {imagePreview && (
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img 
                    src={imagePreview} 
                    alt="Your item" 
                    className="w-full h-auto" 
                  />
                </div>
              )}
            </div>
            
            <Collapsible open={!isCollapsed} className="space-y-4">
              <CollapsibleContent>
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                    <h3 className="font-semibold text-green-800 dark:text-green-400">AI Solution Generated</h3>
                  </div>
                  <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line max-h-[50vh] overflow-y-auto prose dark:prose-invert prose-sm">
                    {solution.startsWith('#') ? (
                      <div dangerouslySetInnerHTML={{ 
                        __html: solution
                          .split('\n')
                          .map(line => {
                            if (line.startsWith('# ')) {
                              return `<h1>${line.substring(2)}</h1>`;
                            } else if (line.startsWith('## ')) {
                              return `<h2>${line.substring(3)}</h2>`;
                            } else if (line.startsWith('### ')) {
                              return `<h3>${line.substring(4)}</h3>`;
                            } else if (line.startsWith('- ')) {
                              return `<li>${line.substring(2)}</li>`;
                            } else if (line === '') {
                              return '<br/>';
                            } else {
                              return `<p>${line}</p>`;
                            }
                          })
                          .join('')
                      }} />
                    ) : (
                      solution
                    )}
                  </div>
                </div>
              </CollapsibleContent>
              
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="dark:border-gray-600 dark:text-white"
                >
                  Close
                </Button>
              </div>
            </Collapsible>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadArea;
