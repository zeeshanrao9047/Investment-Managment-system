import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  User,
  Key,
  Mail,
  Loader2,
  Camera,
  Shield
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const profileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user?.username || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const response = await apiRequest("PATCH", "/api/user", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      // Invalidate user query to refresh user data
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async (data: PasswordFormValues) => {
      const response = await apiRequest("POST", "/api/user/password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update password. Please try again.",
        variant: "destructive",
      });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Avatar uploaded",
        description: "Your avatar has been updated successfully.",
      });
      // Invalidate user query to refresh user data with new avatar
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleProfileSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  const handlePasswordSubmit = (data: PasswordFormValues) => {
    updatePasswordMutation.mutate(data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = () => {
    if (avatarFile) {
      uploadAvatarMutation.mutate(avatarFile);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="w-full">
          <Header value="Settings" />
          <main className="max-w-full p-3 md:p-5 mt-[65px] lg:mt-0 transition-all duration-100 ease-in-out">
            <div className="container max-w-4xl mx-auto py-3 flex flex-col items-center">
              <div className="mb-8 text-center w-full">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences.
                </p>
              </div>

              <Tabs defaultValue="profile" className="space-y-6 w-full">
                <div className="flex justify-center">
                  <TabsList className="mx-auto">
                    <TabsTrigger value="profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="password" className="flex items-center">
                      <Key className="mr-2 h-4 w-4" />
                      Password
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="profile">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          Update your account profile information and email address.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Form {...profileForm}>
                          <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                            <FormField
                              control={profileForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input placeholder="username" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    This is your public display name.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid gap-4 grid-cols-2">
                              <FormField
                                control={profileForm.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={profileForm.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    We'll never share your email with anyone else.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex justify-center">
                              <Button
                                type="submit"
                                disabled={updateProfileMutation.isPending}
                              >
                                {updateProfileMutation.isPending && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Save changes
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                        <CardDescription>
                          Upload a new profile picture.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center space-y-4">
                        <Avatar className="h-32 w-32 p-[3px]">
                          <AvatarImage className='rounded-full'
                            src={avatarPreview || (user?.avatarUrl ? user.avatarUrl : "")}
                            alt="Profile picture"
                          />
                          <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                            {user?.firstName?.[0]}{user?.lastName?.[0] || user?.username?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div className="grid w-full max-w-sm gap-2">
                          <label
                            htmlFor="avatar-upload"
                            className="flex cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Select Image
                            <input
                              id="avatar-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleAvatarChange}
                            />
                          </label>

                          {avatarFile && (
                            <Button
                              onClick={handleAvatarUpload}
                              disabled={uploadAvatarMutation.isPending}
                              className="w-full"
                            >
                              {uploadAvatarMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Upload Avatar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="password">
                  <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                          <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Password must be at least 8 characters.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-center">
                            <Button
                              type="submit"
                              disabled={updatePasswordMutation.isPending}
                            >
                              {updatePasswordMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Update Password
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security preferences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        These security features will be available in future updates.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <h4 className="font-medium">Two-factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account.
                            </p>
                          </div>
                          <Button disabled variant="outline">Coming Soon</Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <h4 className="font-medium">Login History</h4>
                            <p className="text-sm text-muted-foreground">
                              View your recent login activity.
                            </p>
                          </div>
                          <Button disabled variant="outline">Coming Soon</Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <h4 className="font-medium">API Tokens</h4>
                            <p className="text-sm text-muted-foreground">
                              Manage access tokens for external applications.
                            </p>
                          </div>
                          <Button disabled variant="outline">Coming Soon</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
