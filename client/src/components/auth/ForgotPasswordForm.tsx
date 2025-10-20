import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordFormValues) => {
      // In a real application, this would send a request to reset the password
      // For this prototype, we'll just show a success message
      return new Promise(resolve => setTimeout(() => resolve(data), 1000));
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Success",
        description: "If an account exists with that email, you will receive password reset instructions shortly.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Mail className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Check your email</h2>
        <p className="text-neutral-mid mb-6">
          We've sent password reset instructions to your email address.
        </p>
        <Button variant="outline" className="w-full" onClick={onBackToLogin}>
          Back to login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBackToLogin}
        className="flex items-center text-sm text-neutral-mid hover:text-neutral-dark transition-colors mb-4"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to login
      </button>
      
      <h1 className="text-xl font-bold text-neutral-dark mb-1">Forgot your password?</h1>
      <p className="text-neutral-mid text-sm mb-6">
        Your Fund Admin Portal
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email" className="text-sm font-medium text-neutral-dark">
                  Email Address
                </Label>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-mid h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? "Sending..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;