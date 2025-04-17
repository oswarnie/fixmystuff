
import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const UploadArea = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [issue, setIssue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Triggers when file input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Handle the file upload
  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setUploading(false);
        toast({
          title: "Upload successful!",
          description: "Your image has been uploaded. Describe the issue to get help.",
        });
      };
      reader.readAsDataURL(file);
    }, 1500);
  };

  // Open file input when the button is clicked
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) return;
    
    toast({
      title: "Request submitted!",
      description: "Your fix request has been submitted to the community.",
    });
    
    // Reset form (in a real app, you'd submit this data to a server)
    setTimeout(() => {
      setUploadedImage(null);
      setIssue("");
    }, 1500);
  };

  // Remove the uploaded image
  const removeImage = () => {
    setUploadedImage(null);
    setIssue("");
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in">
      {!uploadedImage ? (
        <div 
          className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all ${
            dragActive ? 'border-fixmystuff-teal bg-fixmystuff-teal/5' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          
          <div className={`w-16 h-16 mb-4 bg-fixmystuff-teal/10 rounded-full flex items-center justify-center ${dragActive ? 'animate-pulse-light' : ''}`}>
            <Upload className="h-8 w-8 text-fixmystuff-teal" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Upload an image</h3>
          <p className="text-center text-gray-500 mb-4">
            Drag & drop an image of what needs fixing, or click the button below
          </p>
          
          <Button 
            onClick={onButtonClick}
            className="bg-fixmystuff-teal hover:bg-fixmystuff-teal/90"
          >
            Choose Image
          </Button>
          
          <p className="mt-4 text-sm text-gray-400">
            Supported formats: JPEG, PNG, GIF, etc.
          </p>
        </div>
      ) : (
        <div className="border rounded-xl p-6 bg-white card-shadow animate-pop-in">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-800">What needs fixing?</h3>
              <button onClick={removeImage} className="text-gray-400 hover:text-fixmystuff-orange transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={uploadedImage} 
                alt="Uploaded item" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">
                  Describe the issue
                </label>
                <textarea
                  id="issue"
                  rows={3}
                  placeholder="What's broken and how can the community help fix it?"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-fixmystuff-teal focus:ring-fixmystuff-teal"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-fixmystuff-teal hover:bg-fixmystuff-teal/90"
                disabled={!issue.trim()}
              >
                Get Help Fixing This
              </Button>
            </form>
          </div>
        </div>
      )}
      
      {uploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center">
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-fixmystuff-teal animate-spin" />
            </div>
            <h3 className="text-lg font-medium mb-2">Uploading your image...</h3>
            <p className="text-gray-500">Please wait while we process your image.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
