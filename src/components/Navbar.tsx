
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Wrench, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SignOutConfirmation from './SignOutConfirmation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = () => {
    setIsSignOutDialogOpen(true);
  };

  const confirmSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out successfully"
      });
      setIsSignOutDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error signing out",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 animate-fade-in">
            <Wrench className="h-6 w-6 text-fixmystuff-teal" />
            <span className="font-bold text-xl gradient-text">fixmystuff.io</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 animate-fade-in">
            <Link to="/" className="text-gray-600 hover:text-fixmystuff-teal transition-colors dark:text-gray-300">Home</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-fixmystuff-teal transition-colors dark:text-gray-300">How It Works</Link>
            <Link to="/use-cases" className="text-gray-600 hover:text-fixmystuff-teal transition-colors dark:text-gray-300">Use Cases</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-3 animate-fade-in">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="bg-fixmystuff-teal text-white">
                        {profile?.username ? profile.username[0].toUpperCase() : <User />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-none">
                      {profile?.username || "User"}
                    </p>
                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" className="border-fixmystuff-teal text-fixmystuff-teal hover:bg-fixmystuff-teal/10" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button className="bg-fixmystuff-teal hover:bg-fixmystuff-teal/90" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          <button 
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-slide-up">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 py-2 hover:text-fixmystuff-teal transition-colors dark:text-gray-300">Home</Link>
              <Link to="/how-it-works" className="text-gray-600 py-2 hover:text-fixmystuff-teal transition-colors dark:text-gray-300">How It Works</Link>
              <Link to="/use-cases" className="text-gray-600 py-2 hover:text-fixmystuff-teal transition-colors dark:text-gray-300">Use Cases</Link>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="bg-fixmystuff-teal text-white">
                        {profile?.username ? profile.username[0].toUpperCase() : <User />}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {profile?.username || "User"}
                    </span>
                  </div>
                  <Button variant="outline" className="justify-start text-gray-600 dark:text-gray-300" onClick={() => navigate('/settings')}>
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut} className="justify-start text-red-500 dark:text-red-400">
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Button variant="outline" className="w-full border-fixmystuff-teal text-fixmystuff-teal hover:bg-fixmystuff-teal/10" onClick={() => navigate('/login')}>
                    Log In
                  </Button>
                  <Button className="w-full bg-fixmystuff-teal hover:bg-fixmystuff-teal/90" onClick={() => navigate('/signup')}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <SignOutConfirmation 
        isOpen={isSignOutDialogOpen} 
        onConfirm={confirmSignOut} 
        onCancel={() => setIsSignOutDialogOpen(false)} 
      />
    </>
  );
};

export default Navbar;
