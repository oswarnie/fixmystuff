
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Upload, User, Moon, Sun, Save, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, refreshProfile, isUsernameChangeAllowed } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(profile?.username || '');
  const [usernameError, setUsernameError] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url || '');
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  React.useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
    }

    // Update state when profile data changes
    if (profile) {
      setUsername(profile.username || '');
      if (profile.avatar_url) setAvatarPreview(profile.avatar_url);
    }
  }, [user, profile, navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setAvatarFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: newDarkMode ? "Dark mode enabled" : "Light mode enabled",
    });
  };

  const checkUsernameExists = async (username: string) => {
    // Skip check if it's the same as the current username
    if (profile?.username === username) {
      return false;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();
    
    return !!data;
  };

  const saveProfile = async () => {
    if (!user) return;
    
    // Reset error
    setUsernameError('');
    
    // Validate username
    if (username.trim().length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setUsernameError('Username can only contain letters, numbers, underscores and hyphens');
      return;
    }
    
    // Check if username change is allowed (once every 6 hours)
    if (profile?.username !== username && !isUsernameChangeAllowed()) {
      setUsernameError('You can only change your username once every 6 hours');
      return;
    }

    setLoading(true);
    try {
      // Check if username already exists
      if (profile?.username !== username) {
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
          setUsernameError('This username is already taken');
          setLoading(false);
          return;
        }
      }

      let avatar_url = profile?.avatar_url || '';
      
      // Upload avatar if changed
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('fix_images')
          .upload(filePath, avatarFile);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from('fix_images')
          .getPublicUrl(filePath);
          
        avatar_url = data.publicUrl;
      }
      
      // Update profile data
      const updates = {
        username,
        avatar_url,
        ...(profile?.username !== username ? { last_username_change: new Date().toISOString() } : {})
      };
      
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update user metadata
      await supabase.auth.updateUser({
        data: { username }
      });
      
      // Refresh profile data
      await refreshProfile();
      
      toast({
        title: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 animate-fade-in dark:text-white">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full max-w-4xl mx-auto">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="animate-fade-in">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Profile Information</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback className="bg-fixmystuff-teal text-white text-xl">
                        {username ? username[0].toUpperCase() : <User />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="relative">
                      <Button variant="outline" className="relative overflow-hidden" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleAvatarChange}
                        />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Username
                      </label>
                      <Input
                        id="username"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setUsernameError('');
                        }}
                        className={usernameError ? "border-red-500" : ""}
                      />
                      {usernameError && (
                        <p className="text-sm text-red-500 mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {usernameError}
                        </p>
                      )}
                      
                      {profile?.username !== username && !isUsernameChangeAllowed() && (
                        <Alert className="mt-4" variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Username change limit</AlertTitle>
                          <AlertDescription>
                            You can only change your username once every 6 hours.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Email
                      </label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground mt-1 dark:text-gray-400">
                        Email cannot be changed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={saveProfile} 
                  disabled={loading} 
                  className="bg-fixmystuff-teal hover:bg-fixmystuff-teal/90 ml-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="animate-fade-in">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Appearance</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Customize how the application looks and feels
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-card dark:bg-gray-700 dark:border-gray-600">
                  <div>
                    <h3 className="font-medium dark:text-white">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleDarkMode}
                    className="h-10 w-10 transition-all duration-200 hover:scale-105 dark:border-gray-600 dark:text-white"
                  >
                    {isDarkMode ? (
                      <Sun className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                      <Moon className="h-[1.2rem] w-[1.2rem]" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
