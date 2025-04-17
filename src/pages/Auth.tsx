
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Wrench className="h-6 w-6 text-fixmystuff-teal" />
            <span className="font-bold text-xl gradient-text">fixmystuff.io</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to continue fixing your items' : 'Get started with AI-powered repair solutions'}
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <AuthForm mode={isLogin ? 'login' : 'signup'} />
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="text-fixmystuff-teal hover:underline">
                  Sign up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-fixmystuff-teal hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
