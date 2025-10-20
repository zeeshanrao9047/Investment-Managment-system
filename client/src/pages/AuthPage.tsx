import React from 'react';
import { Redirect } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthCard from '@/components/auth/AuthCard';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

const AuthPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }
  
  // Redirect to dashboard if already logged in
  if (user) {
    return <Redirect to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-lightest">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <AuthCard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
