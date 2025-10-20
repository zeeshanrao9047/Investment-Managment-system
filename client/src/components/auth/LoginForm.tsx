import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

interface LoginFormProps {
  onForgotPassword: () => void;
}

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [, navigate] = useLocation();
  const { loginMutation } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate({
      username: data.email, // Use email as username
      password: data.password
    });
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-dark mb-1">Welcome to <span className="text-[#4CC7D1]">Finally</span></h1>
      <p className="text-neutral-mid text-sm mb-6">Your Fund Admin Portal</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email" className="text-sm font-medium text-neutral-dark">
                  Email or username
                </Label>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-mid h-5 w-5" />
                    <Input
                      id="email"
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-neutral-dark">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-xs text-primary hover:text-primary-dark transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-mid h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-mid hover:text-neutral-dark"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    id="remember-me"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label
                  htmlFor="remember-me"
                  className="text-sm font-normal text-neutral-dark"
                >
                  Remember me
                </Label>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
