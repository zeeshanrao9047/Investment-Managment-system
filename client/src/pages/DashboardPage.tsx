import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, MoreHorizontal, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/projects';
import type { Project } from '@shared/schema';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const projectFormSchema = z.object({
  name: z.string().default('Untitled Project'),
  shortCode: z.string().default('PROJ'),
  companyName: z.string().optional(),
  subdomain: z.string().optional(),
  users: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function DashboardPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location, navigate] = useLocation();

  // Get all projects
  const { data, isLoading, error } = useQuery({ 
    queryKey: ['/api/projects'],
    queryFn: getProjects
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setIsAddDialogOpen(false);
      toast({
        title: 'Project created',
        description: 'Your project has been created successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProjectFormValues }) => 
      updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setIsEditDialogOpen(false);
      toast({
        title: 'Project updated',
        description: 'Your project has been updated successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update project. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setIsDeleteDialogOpen(false);
      toast({
        title: 'Project deleted',
        description: 'Your project has been deleted successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Add project form
  const addForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      shortCode: '',
      companyName: '',
      subdomain: '',
      users: [],
      status: 'active',
    },
  });

  // Edit project form
  const editForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      shortCode: '',
      companyName: '',
      subdomain: '',
      users: [],
      status: 'active',
    },
  });

  const handleAddSubmit = (data: ProjectFormValues) => {
    data.users = emails;
    // Generate random name and shortcode if not provided
    data.name = data.name || `Project ${Math.floor(Math.random() * 1000)}`;
    data.shortCode = data.shortCode || `P${Math.floor(Math.random() * 100)}`;
    createProjectMutation.mutate(data);
  };

  const handleEditSubmit = (data: ProjectFormValues) => {
    if (selectedProject) {
      // Update with the current team members from selectedProject
      data.users = selectedProject.users || [];
      updateProjectMutation.mutate({ id: selectedProject.id, data });
    }
  };

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    // Reset the emails array with the project's users
    setEmails(project.users || []);
    editForm.reset({
      name: project.name,
      shortCode: project.shortCode,
      companyName: project.companyName || '',
      subdomain: project.subdomain || '',
      users: project.users || [],
      status: project.status as 'active' | 'inactive',
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleAddEmail = () => {
    if (emailInput && emailInput.includes('@') && !emails.includes(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-slate-50/50 pl-4">
          <div className="max-w-full py-4">
            <div className="mb-4">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">Projects</h1>
                <Button 
                  onClick={() => {
                    addForm.reset();
                    setEmails([]);
                    setIsAddDialogOpen(true);
                  }}
                  size="sm"
                  variant="outline"
                  className="flex-shrink-0 bg-primary/30 text-primary border-primary/30 hover:bg-primary/40 text-xs py-1 h-7 ml-4"
                >
                  <Plus className="mr-1 h-3 w-3" /> 
                  Add Project
                </Button>
              </div>
              
              <div className="mt-4 mb-6">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input 
                    placeholder="Search projects" 
                    className="pl-7 py-1 h-8 text-sm w-full shadow-sm border border-gray-200" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="text-center p-4 col-span-full">Loading projects...</div>
              ) : error ? (
                <div className="text-center text-red-500 p-4 col-span-full">
                  Failed to load projects. Please try again.
                </div>
              ) : data && data.projects && data.projects.length > 0 ? (
                data.projects.map((project: Project) => (
                  <Card 
                    key={project.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-white border border-gray-100"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary text-xs font-medium">
                            {project.shortCode.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <CardTitle className="text-base font-medium">{project.name}</CardTitle>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking menu
                            >
                              <MoreHorizontal className="h-3 w-3" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click when clicking menu item
                                handleEditClick(project);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-500"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click when clicking menu item
                                handleDeleteClick(project);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-flex items-center">
                          {project.status}
                        </div>
                        {project.subdomain && (
                          <span className="text-[10px] text-muted-foreground">
                            {project.subdomain}.finally.app
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 col-span-full flex flex-col items-center justify-center">
                  <p className="text-lg mb-4">No projects found. Add a new project to get started.</p>
                  <div className="w-24 h-1 bg-gray-200 rounded"></div>
                </div>
              )}
            </div>
          
            {/* Add Project Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                  <DialogDescription>
                    Create a new project.
                  </DialogDescription>
                </DialogHeader>
                <Form {...addForm}>
                  <form onSubmit={addForm.handleSubmit(handleAddSubmit)} className="space-y-4">
                    <FormField
                      control={addForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Project name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={addForm.control}
                        name="shortCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Code</FormLabel>
                            <FormControl>
                              <Input placeholder="PRJ1" maxLength={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value || "active"}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={addForm.control}
                      name="subdomain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL (Subdomain)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input placeholder="subdomain" {...field} />
                              <span className="ml-2 text-muted-foreground">.finally.app</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                      <FormLabel>Team Members (Email)</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="email"
                          placeholder="team@example.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddEmail();
                            }
                          }}
                        />
                        <Button 
                          type="button" 
                          variant="secondary"
                          onClick={handleAddEmail}
                        >
                          Add
                        </Button>
                      </div>
                      {emails.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {emails.map((email) => (
                            <Badge 
                              key={email} 
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {email}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => handleRemoveEmail(email)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </FormItem>
                    
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-primary/90 hover:bg-primary/80 text-white"
                        disabled={createProjectMutation.isPending}
                      >
                        {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            {/* Edit Project Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                  <DialogDescription>
                    Update the project details.
                  </DialogDescription>
                </DialogHeader>
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4">
                    <FormField
                      control={editForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Project name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="shortCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Code</FormLabel>
                            <FormControl>
                              <Input placeholder="PRJ1" maxLength={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={editForm.control}
                      name="subdomain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL (Subdomain)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Input placeholder="subdomain" {...field} />
                              <span className="ml-2 text-muted-foreground">.finally.app</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                      <FormLabel>Team Members (Email)</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="email"
                          placeholder="team@example.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddEmail();
                            }
                          }}
                        />
                        <Button 
                          type="button" 
                          variant="secondary"
                          onClick={handleAddEmail}
                        >
                          Add
                        </Button>
                      </div>
                      {emails.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {emails.map((email) => (
                            <Badge 
                              key={email} 
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {email}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => {
                                  if (selectedProject) {
                                    const updatedEmails = emails.filter(e => e !== email);
                                    setEmails(updatedEmails);
                                    // Also update the selectedProject to keep in sync
                                    setSelectedProject({...selectedProject, users: updatedEmails});
                                  }
                                }}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </FormItem>
                    
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-primary/90 hover:bg-primary/80 text-white"
                        disabled={updateProjectMutation.isPending}
                      >
                        {updateProjectMutation.isPending ? 'Updating...' : 'Update Project'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            {/* Delete Project Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Project</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this project? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {selectedProject && (
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium">
                        {selectedProject.name}
                      </h4>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => selectedProject && deleteProjectMutation.mutate(selectedProject.id)}
                    disabled={deleteProjectMutation.isPending}
                  >
                    {deleteProjectMutation.isPending ? 'Deleting...' : 'Delete Project'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}
