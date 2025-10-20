import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type AuthView = 'login' | 'signup' | 'forgotPassword';

const AuthCard: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
      <div className="flex justify-center mb-6">
        <img 
          src="/assets/finally-logo.png" 
          alt="Finally Logo" 
          className="h-16 w-auto"
        />
      </div>

      {currentView === 'login' && (
        <>
          <LoginForm onForgotPassword={() => setCurrentView('forgotPassword')} />
          <div className="mt-6 text-center">
            <p className="text-neutral-mid text-sm mb-2">Don't have an account?</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setCurrentView('signup')}
            >
              Create an account
            </Button>
          </div>
        </>
      )}

      {currentView === 'signup' && (
        <>
          <SignupForm />
          <div className="mt-6 text-center">
            <p className="text-neutral-mid text-sm mb-2">Already have an account?</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setCurrentView('login')}
            >
              Log in
            </Button>
          </div>
        </>
      )}

      {currentView === 'forgotPassword' && (
        <ForgotPasswordForm onBackToLogin={() => setCurrentView('login')} />
      )}
    </div>
  );
};

export default AuthCard;
