import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "@/components/ui/color-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { whitelabelSchema } from "@shared/schema";
import { 
  Check, 
  Trash, 
  Upload, 
  Paperclip, 
  Link, 
  Plus, 
  X,
  FileText,
  ArrowUp,
  ArrowDown,
  Download,
  Eye,
  Save
} from "lucide-react";
import { DealroomPreview } from "@/components/dealroom/DealroomPreview";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Form schema definition
const whitelabelFormSchema = whitelabelSchema.extend({
  title: z.string().min(1, "Title is required"),
});

type WhitelabelFormValues = z.infer<typeof whitelabelFormSchema>;

export default function ProjectDetailsPage() {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const projectId = params.id ? parseInt(params.id) : null;
  const [activeTab, setActiveTab] = useState('dealroom');
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [tempPreviewProject, setTempPreviewProject] = useState<any>(null);
  
  // State for external resources URLs
  // Key metrics state
  const [keyMetrics, setKeyMetrics] = useState<{name: string, value: string}[]>([]);
  const [newMetricName, setNewMetricName] = useState('');
  const [newMetricValue, setNewMetricValue] = useState('');
  
  // External resources state
  const [externalResources, setExternalResources] = useState<{label: string, url: string}[]>([]);
  const [newResourceLabel, setNewResourceLabel] = useState('');
  const [newResourceUrl, setNewResourceUrl] = useState('');
  
  // State for image URL
  const [imageUrl, setImageUrl] = useState('');
  
  // State for file attachments
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string; size?: string; type?: string }[]>([]);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  
  // Handler for saving showcase images from the preview
  const handleSaveImages = (images: any[]) => {
    if (form.getValues()) {
      // We don't need to call setValue separately because this is the whole array
      form.setValue('showcaseImages', images);
      
      // Store these for preview
      if (tempPreviewProject) {
        setTempPreviewProject({
          ...tempPreviewProject,
          whitelabel: {
            ...tempPreviewProject.whitelabel,
            showcaseImages: images
          }
        });
      }
      
      // Trigger a re-render by clicking Save button
      setTimeout(() => {
        document.getElementById('save-whitelabel-button')?.click();
      }, 100);
    }
  };

  // Refs for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Get project data
  const { data: project, isLoading } = useQuery<any>({
    queryKey: ['/api/projects', projectId],
    enabled: !!projectId,
  });

  // Initialize form with project data
  const form = useForm<WhitelabelFormValues>({
    resolver: zodResolver(whitelabelFormSchema),
    defaultValues: {
      title: project?.name || '',
      subtitle: project?.whitelabel?.subtitle || '',
      primaryColor: project?.whitelabel?.primaryColor || '#4CC7D1',
      logoUrl: project?.whitelabel?.logoUrl || '',
      description: project?.whitelabel?.description || '',
      enableRegistration: project?.whitelabel?.enableRegistration !== undefined ? project?.whitelabel?.enableRegistration : true,
      showcaseImages: project?.whitelabel?.showcaseImages || [],
      
      // Investment and financial details
      investmentHeadline: project?.whitelabel?.investmentHeadline || '',
      investmentSummary: project?.whitelabel?.investmentSummary || '',
      capitalRaise: project?.whitelabel?.capitalRaise || '',
      postValuation: project?.whitelabel?.postValuation || '',
      revenueProjection: project?.whitelabel?.revenueProjection || '',
      exitRange: project?.whitelabel?.exitRange || '',
      returnMultiple: project?.whitelabel?.returnMultiple || '',
      keyMetrics: project?.whitelabel?.keyMetrics || [],
      
      // UI settings
      enableSocialSharing: project?.whitelabel?.enableSocialSharing !== undefined ? project?.whitelabel?.enableSocialSharing : false,
      showFundraisingProgress: project?.whitelabel?.showFundraisingProgress !== undefined ? project?.whitelabel?.showFundraisingProgress : false,
      showTeamMembers: project?.whitelabel?.showTeamMembers !== undefined ? project?.whitelabel?.showTeamMembers : true,
      enableDocumentsSection: project?.whitelabel?.enableDocumentsSection !== undefined ? project?.whitelabel?.enableDocumentsSection : true,
      enableContactForm: project?.whitelabel?.enableContactForm !== undefined ? project?.whitelabel?.enableContactForm : false,
      contactFormRecipient: project?.whitelabel?.contactFormRecipient || '',
      headerLinks: project?.whitelabel?.headerLinks || [],
      
      // Resources
      externalResources: project?.whitelabel?.externalResources || [],
      attachments: project?.whitelabel?.attachments || [],
    },
  });

  // Update form values when project data is loaded
  useEffect(() => {
    if (project) {
      console.log("Project data loaded:", project);
      
      // The projects array contains a single object, so extract it
      const projectData = Array.isArray(project.projects) ? project.projects[0] : project;
      console.log("Processed project data:", projectData);
      console.log("Showcase images:", projectData.whitelabel?.showcaseImages);
      
      // Set all form values
      form.reset({
        title: projectData.name,
        subtitle: projectData.whitelabel?.subtitle || '',
        primaryColor: projectData.whitelabel?.primaryColor || '#4CC7D1',
        logoUrl: projectData.whitelabel?.logoUrl || '',
        description: projectData.whitelabel?.description || '',
        enableRegistration: projectData.whitelabel?.enableRegistration !== undefined ? projectData.whitelabel?.enableRegistration : true,
        showcaseImages: projectData.whitelabel?.showcaseImages || [],
        
        // Investment and financial details
        investmentHeadline: projectData.whitelabel?.investmentHeadline || '',
        investmentSummary: projectData.whitelabel?.investmentSummary || '',
        capitalRaise: projectData.whitelabel?.capitalRaise || '',
        postValuation: projectData.whitelabel?.postValuation || '',
        revenueProjection: projectData.whitelabel?.revenueProjection || '',
        exitRange: projectData.whitelabel?.exitRange || '',
        returnMultiple: projectData.whitelabel?.returnMultiple || '',
        keyMetrics: projectData.whitelabel?.keyMetrics || [],
        
        // UI settings
        enableSocialSharing: projectData.whitelabel?.enableSocialSharing !== undefined ? projectData.whitelabel?.enableSocialSharing : false,
        showFundraisingProgress: projectData.whitelabel?.showFundraisingProgress !== undefined ? projectData.whitelabel?.showFundraisingProgress : false,
        showTeamMembers: projectData.whitelabel?.showTeamMembers !== undefined ? projectData.whitelabel?.showTeamMembers : true,
        enableDocumentsSection: projectData.whitelabel?.enableDocumentsSection !== undefined ? projectData.whitelabel?.enableDocumentsSection : true,
        enableContactForm: projectData.whitelabel?.enableContactForm !== undefined ? projectData.whitelabel?.enableContactForm : false,
        contactFormRecipient: projectData.whitelabel?.contactFormRecipient || '',
        headerLinks: projectData.whitelabel?.headerLinks || [],
        
        // Resources
        externalResources: projectData.whitelabel?.externalResources || [],
        attachments: projectData.whitelabel?.attachments || [],
      });
      
      // Set external resources state
      setExternalResources(projectData.whitelabel?.externalResources || []);
      
      // Set attachments state
      setFiles(projectData.whitelabel?.attachments || []);
      
      // Set key metrics state
      setKeyMetrics(projectData.whitelabel?.keyMetrics || []);
      
      // Make sure showcase images are set correctly
      setTimeout(() => {
        console.log("Form values after reset:", form.getValues());
        console.log("Showcase Images count:", form.getValues('showcaseImages')?.length || 0);
      }, 500);
    }
  }, [project, form]);

  // Mutation to update whitelabel settings
  const whitelabelMutation = useMutation({
    mutationFn: async (data: WhitelabelFormValues) => {
      if (!projectId) throw new Error("Project ID is required");
      
      const response = await apiRequest(
        "PATCH",
        `/api/projects/${projectId}/whitelabel`,
        data
      );
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Settings updated",
        description: "Your dealroom settings have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/projects', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update settings: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: WhitelabelFormValues) => {
    // Add external resources and attachments to the form data
    const formData = {
      ...data,
      externalResources,
      attachments: files,
    };
    
    whitelabelMutation.mutate(formData);
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !projectId) return;
    
    setUploadingImages(true);
    setImageUploadError(null);
    
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    
    try {
      const response = await fetch(`/api/projects/${projectId}/images`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload images');
      }
      
      const result = await response.json();
      
      // Get the current images from the form
      let currentImages = form.getValues('showcaseImages');
      if (!currentImages || currentImages.length === 0) {
        // Fallback to project data if form doesn't have the images yet
        currentImages = (project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages || [];
      }
      
      // Merge with new images from the API response
      const updatedImages = [
        ...currentImages,
        ...result.project.whitelabel.showcaseImages.filter((img: any) => 
          !currentImages.some((existingImg: any) => existingImg.url === img.url)
        )
      ];
      
      // Make sure at least one image is marked as main
      if (updatedImages.length > 0 && !updatedImages.some(img => img.isMain)) {
        updatedImages[0].isMain = true;
      }
      
      // Update form with merged images
      form.setValue('showcaseImages', updatedImages);
      
      // Also update the project data to keep it in sync
      if (project?.projects && project.projects[0]) {
        if (!project.projects[0].whitelabel) {
          project.projects[0].whitelabel = {};
        }
        project.projects[0].whitelabel.showcaseImages = updatedImages;
      } else if (project) {
        if (!project.whitelabel) {
          project.whitelabel = {};
        }
        project.whitelabel.showcaseImages = updatedImages;
      }
      
      toast({
        title: "Images uploaded",
        description: "Your images have been uploaded successfully.",
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/projects', projectId] });
    } catch (error) {
      setImageUploadError((error as Error).message);
      toast({
        title: "Error",
        description: `Failed to upload images: ${(error as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
      // Clear file input
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  // Handle setting main image
  const handleSetMainImage = async (imageIndex: number) => {
    if (!projectId) return;
    
    try {
      // Get the current images from the form or from the project data if not in form yet
      let currentImages = form.getValues('showcaseImages');
      if (!currentImages || currentImages.length === 0) {
        // Fallback to project data if form doesn't have the images yet
        currentImages = (project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages || [];
      }
      
      // Create a deep copy of the images array and set all to non-main
      const updatedImages = currentImages.map(img => ({...img, isMain: false}));
      
      // Set the selected image as main
      if (updatedImages[imageIndex]) {
        updatedImages[imageIndex].isMain = true;
      }
      
      // Update form with updated images first for immediate UI feedback
      form.setValue('showcaseImages', updatedImages);
      
      // Also update the project data to keep it in sync
      if (project?.projects && project.projects[0]) {
        if (!project.projects[0].whitelabel) {
          project.projects[0].whitelabel = {};
        }
        project.projects[0].whitelabel.showcaseImages = updatedImages;
      } else if (project) {
        if (!project.whitelabel) {
          project.whitelabel = {};
        }
        project.whitelabel.showcaseImages = updatedImages;
      }
      
      // Then make the API call to persist the change
      const response = await apiRequest(
        "PUT",
        `/api/projects/${projectId}/images/${imageIndex}/main`,
        {}
      );
      
      const result = await response.json();
      
      toast({
        title: "Main image updated",
        description: "Your main showcase image has been updated.",
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/projects', projectId] });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update main image: ${(error as Error).message}`,
        variant: "destructive",
      });
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (imageIndex: number) => {
    if (!projectId) return;
    
    try {
      // Get the current images from the form or from the project data if not in form yet
      let currentImages = form.getValues('showcaseImages');
      if (!currentImages || currentImages.length === 0) {
        // Fallback to project data if form doesn't have the images yet
        currentImages = (project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages || [];
      }
      
      // Create a deep copy of the images array
      const updatedImages = [...currentImages];
      
      // Remove the image at the specified index
      updatedImages.splice(imageIndex, 1);
      
      // Ensure there's a main image if there are still images
      if (updatedImages.length > 0 && !updatedImages.some(img => img.isMain)) {
        updatedImages[0].isMain = true;
      }
      
      // Update form for immediate UI feedback
      form.setValue('showcaseImages', updatedImages);
      
      // Also update the project data to keep it in sync
      if (project?.projects && project.projects[0]) {
        if (!project.projects[0].whitelabel) {
          project.projects[0].whitelabel = {};
        }
        project.projects[0].whitelabel.showcaseImages = updatedImages;
      } else if (project) {
        if (!project.whitelabel) {
          project.whitelabel = {};
        }
        project.whitelabel.showcaseImages = updatedImages;
      }
      
      // Call API to persist the deletion
      const response = await apiRequest(
        "DELETE",
        `/api/projects/${projectId}/images/${imageIndex}`,
        {}
      );
      
      const result = await response.json();
      
      toast({
        title: "Image deleted",
        description: "The image has been deleted successfully.",
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/projects', projectId] });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete image: ${(error as Error).message}`,
        variant: "destructive",
      });
    }
  };
  
  // Handle moving images up
  const handleMoveImageUp = (imageIndex: number) => {
    if (imageIndex === 0) return; // Already at the top
    
    // Get the current images from the form or from the project data if not in form yet
    let currentImages = form.getValues('showcaseImages');
    if (!currentImages || currentImages.length === 0) {
      // Fallback to project data if form doesn't have the images yet
      currentImages = (project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages || [];
    }
    
    // Make a copy of the array to avoid direct mutation
    const newImages = [...currentImages];
    
    // Swap with previous image
    [newImages[imageIndex], newImages[imageIndex - 1]] = 
      [newImages[imageIndex - 1], newImages[imageIndex]];
    
    // Update form value
    form.setValue('showcaseImages', newImages);
    
    // Also update the project data to keep it in sync
    if (project?.projects && project.projects[0]) {
      if (!project.projects[0].whitelabel) {
        project.projects[0].whitelabel = {};
      }
      project.projects[0].whitelabel.showcaseImages = newImages;
    } else if (project) {
      if (!project.whitelabel) {
        project.whitelabel = {};
      }
      project.whitelabel.showcaseImages = newImages;
    }
  };
  
  // Handle moving images down
  const handleMoveImageDown = (imageIndex: number) => {
    // Get the current images from the form or from the project data if not in form yet
    let currentImages = form.getValues('showcaseImages');
    if (!currentImages || currentImages.length === 0) {
      // Fallback to project data if form doesn't have the images yet
      currentImages = (project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages || [];
    }
    
    // Make a copy of the array to avoid direct mutation
    const newImages = [...currentImages];
    
    if (imageIndex === newImages.length - 1) return; // Already at the bottom
    
    // Swap with next image
    [newImages[imageIndex], newImages[imageIndex + 1]] = 
      [newImages[imageIndex + 1], newImages[imageIndex]];
    
    // Update form value
    form.setValue('showcaseImages', newImages);
    
    // Also update the project data to keep it in sync
    if (project?.projects && project.projects[0]) {
      if (!project.projects[0].whitelabel) {
        project.projects[0].whitelabel = {};
      }
      project.projects[0].whitelabel.showcaseImages = newImages;
    } else if (project) {
      if (!project.whitelabel) {
        project.whitelabel = {};
      }
      project.whitelabel.showcaseImages = newImages;
    }
  };
  
  // Handle adding image from URL
  const handleAddImageUrl = async () => {
    if (!imageUrl || !projectId) return;
    
    setUploadingImages(true);
    setImageUploadError(null);
    
    try {
      // Check if URL is valid
      if (!imageUrl.match(/^https?:\/\/.+\.(jpeg|jpg|gif|png|webp)$/i)) {
        throw new Error('Please enter a valid image URL (jpg, png, gif, webp)');
      }
      
      // Get the current images from the form or from the project data if not in form yet
      let currentImages = form.getValues('showcaseImages');
      if (!currentImages || currentImages.length === 0) {
        // Fallback to project data if form doesn't have the images yet
        currentImages = (project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages || [];
      }
      
      // Add new image from URL
      const updatedImages = [
        ...currentImages,
        { url: imageUrl, isMain: currentImages.length === 0 }
      ];
      
      // Update form with new images
      form.setValue('showcaseImages', updatedImages);
      
      // Also update the project data to keep it in sync
      if (project?.projects && project.projects[0]) {
        if (!project.projects[0].whitelabel) {
          project.projects[0].whitelabel = {};
        }
        project.projects[0].whitelabel.showcaseImages = updatedImages;
      } else if (project) {
        if (!project.whitelabel) {
          project.whitelabel = {};
        }
        project.whitelabel.showcaseImages = updatedImages;
      }
      
      // Call API to persist the URL
      const response = await apiRequest(
        "POST",
        `/api/projects/${projectId}/images/url`,
        { url: imageUrl }
      );
      
      const result = await response.json();
      
      toast({
        title: "Image added",
        description: "The image URL has been added successfully.",
      });
      
      // Clear the URL input
      setImageUrl('');
      
    } catch (error) {
      setImageUploadError((error as Error).message);
      toast({
        title: "Error",
        description: `Failed to add image URL: ${(error as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
    }
  };

  // Handle adding external resource
  const handleAddResource = () => {
    if (!newResourceLabel || !newResourceUrl) {
      toast({
        title: "Error",
        description: "Both label and URL are required for external resources.",
        variant: "destructive",
      });
      return;
    }
    
    const newResources = [
      ...externalResources,
      { label: newResourceLabel, url: newResourceUrl }
    ];
    
    setExternalResources(newResources);
    setNewResourceLabel('');
    setNewResourceUrl('');
  };

  // Handle removing external resource
  const handleRemoveResource = (index: number) => {
    const newResources = [...externalResources];
    newResources.splice(index, 1);
    setExternalResources(newResources);
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0 || !projectId) return;
    
    setUploadingFiles(true);
    setFileUploadError(null);
    
    const formData = new FormData();
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append('files', uploadedFiles[i]);
    }
    
    try {
      const response = await fetch(`/api/projects/${projectId}/files`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload files');
      }
      
      const result = await response.json();
      
      // Update files state
      setFiles(prevFiles => [...prevFiles, ...result.files]);
      
      toast({
        title: "Files uploaded",
        description: "Your files have been uploaded successfully.",
      });
    } catch (error) {
      setFileUploadError((error as Error).message);
      toast({
        title: "Error",
        description: `Failed to upload files: ${(error as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setUploadingFiles(false);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle removing a file
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Key metrics handlers
  const handleAddKeyMetric = () => {
    if (!newMetricName || !newMetricValue) {
      toast({
        title: "Error",
        description: "Both name and value are required for key metrics.",
        variant: "destructive",
      });
      return;
    }
    
    const newMetrics = [
      ...keyMetrics,
      { name: newMetricName, value: newMetricValue }
    ];
    
    setKeyMetrics(newMetrics);
    form.setValue('keyMetrics', newMetrics);
    setNewMetricName('');
    setNewMetricValue('');
  };

  const handleKeyMetricChange = (index: number, field: 'name' | 'value', value: string) => {
    const updatedMetrics = [...keyMetrics];
    updatedMetrics[index][field] = value;
    setKeyMetrics(updatedMetrics);
    form.setValue('keyMetrics', updatedMetrics);
  };

  const handleDeleteKeyMetric = (index: number) => {
    const updatedMetrics = [...keyMetrics];
    updatedMetrics.splice(index, 1);
    setKeyMetrics(updatedMetrics);
    form.setValue('keyMetrics', updatedMetrics);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The project you are looking for does not exist or you don't have permission to view it.
        </p>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">
            Manage dealroom settings and access control
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex gap-2 items-center" 
            onClick={() => {
              console.log("Preview button clicked");
              
              // Create a merged project object that contains both the stored project data
              // and the current form values that may not have been saved yet
              
              // Get and process showcase images - ensure deep copy to avoid modifying originals
              const showcaseImages = form.watch('showcaseImages') || project.whitelabel?.showcaseImages || [];
              const processedImages = showcaseImages.map(img => ({...img})); // Create a deep copy
              
              // Make sure at least one image is marked as main if there are images
              if (processedImages.length > 0) {
                const hasMainImage = processedImages.some(img => img.isMain === true);
                if (!hasMainImage) {
                  processedImages[0].isMain = true;
                }
              }
              
              console.log("Preview showcase images:", processedImages);
              
              const mergedProject = {
                ...project,
                whitelabel: {
                  ...project.whitelabel,
                  // Add current form values with processed showcase images
                  showcaseImages: processedImages,
                  investmentHeadline: form.watch('investmentHeadline'),
                  investmentSummary: form.watch('investmentSummary'),
                  capitalRaise: form.watch('capitalRaise'),
                  postValuation: form.watch('postValuation'),
                  revenueProjection: form.watch('revenueProjection'),
                  exitRange: form.watch('exitRange'),
                  returnMultiple: form.watch('returnMultiple'),
                  externalResources: externalResources || project.whitelabel?.externalResources || [],
                  keyMetrics: keyMetrics || project.whitelabel?.keyMetrics || [],
                  attachments: files || project.whitelabel?.attachments || [],
                }
              };
              
              console.log("Opening preview with merged project data:", mergedProject);
              // Pass the merged project to the preview
              setTempPreviewProject(mergedProject);
              setPreviewOpen(true);
            }}
          >
            <Eye size={16} />
            Preview Dealroom
          </Button>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dealroom">Dealroom</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="access">Access</TabsTrigger>
        </TabsList>

        <TabsContent value="dealroom">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>SHOWCASE IMAGES</CardTitle>
                  <CardDescription>
                    Add images to showcase your project. The main image will be displayed prominently.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Upload from your device</h3>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => imageInputRef.current?.click()}
                          disabled={uploadingImages}
                          className="w-full h-32 border-dashed flex flex-col items-center justify-center"
                        >
                          {uploadingImages ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 mb-2" />
                              <span>Upload Image</span>
                            </>
                          )}
                        </Button>
                        
                        <input
                          type="file"
                          ref={imageInputRef}
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Add from URL</h3>
                        <div className="flex space-x-2">
                          <Input 
                            placeholder="https://example.com/image.jpg" 
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                          />
                          <Button 
                            type="button"
                            onClick={handleAddImageUrl}
                            disabled={!imageUrl || uploadingImages}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                      
                      {imageUploadError && (
                        <p className="text-sm text-red-500 mt-1">{imageUploadError}</p>
                      )}
                    </div>
                    
                    {(project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages?.length > 0 && (
                      <div className="space-y-4">
                        {/* Image grid display */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {(project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages?.map((image: { url: string, isMain: boolean }, index: number) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square overflow-hidden rounded-md border">
                                <img 
                                  src={image.url} 
                                  alt={`Showcase image ${index + 1}`}
                                  className="object-cover w-full h-full"
                                />
                                
                                {/* Order indicator */}
                                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                  #{index + 1}
                                </div>
                              </div>
                              
                              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Main action buttons */}
                                <div className="flex space-x-2 mb-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className={`${image.isMain ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                                    onClick={() => handleSetMainImage(index)}
                                    title="Set as main image"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="bg-background text-red-500"
                                    onClick={() => handleDeleteImage(index)}
                                    title="Delete image"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                {/* Reordering buttons */}
                                <div className="flex space-x-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="bg-background"
                                    onClick={() => handleMoveImageUp(index)}
                                    disabled={index === 0}
                                    title="Move up"
                                  >
                                    <ArrowUp className="h-4 w-4" />
                                  </Button>
                                  
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="bg-background"
                                    onClick={() => handleMoveImageDown(index)}
                                    disabled={index === ((project?.projects ? project.projects[0] : project)?.whitelabel?.showcaseImages?.length || 0) - 1}
                                    title="Move down"
                                  >
                                    <ArrowDown className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {image.isMain && (
                                <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                  Main
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* Image management instructions and save button */}
                        <div className="flex flex-col gap-4">
                          <div className="bg-slate-50 p-4 rounded-md">
                            <h4 className="text-sm font-medium mb-2">Image Management</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              <li>Hover over an image to see management options</li>
                              <li>Use <Check className="h-3 w-3 inline" /> to set an image as the main showcase image</li>
                              <li>Use <ArrowUp className="h-3 w-3 inline" /> and <ArrowDown className="h-3 w-3 inline" /> to change image order</li>
                              <li>Use <Trash className="h-3 w-3 inline text-red-500" /> to remove an image</li>
                            </ul>
                          </div>
                          
                          <Button 
                            type="button" 
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => {
                              // Make sure we have the latest images from the project
                              const projectData = project?.projects ? project.projects[0] : project;
                              const showcaseImages = projectData?.whitelabel?.showcaseImages || [];
                              
                              // Update the form with the latest showcase images
                              form.setValue('showcaseImages', showcaseImages);
                              
                              // Submit the form
                              form.handleSubmit(onSubmit)();
                              
                              toast({
                                title: "Images saved",
                                description: "Your image changes have been saved."
                              });
                            }}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save Image Changes
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>



              <Card>
                <CardHeader>
                  <CardTitle>INVESTMENT DETAILS</CardTitle>
                  <CardDescription>
                    Provide investment details that will be displayed on your dealroom.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Investment Headline</h3>
                    <p className="text-sm text-muted-foreground">
                      Write a couple sentences describing the desirable features that make this an attractive investment.
                    </p>
                    <FormField
                      control={form.control}
                      name="investmentHeadline"
                      render={({ field }) => (
                        <FormItem>
                          <div className="border rounded-md">
                            <ReactQuill 
                              theme="snow"
                              value={field.value || ''}
                              onChange={field.onChange}
                              modules={{
                                toolbar: [
                                  ['bold', 'italic', 'underline', 'link'],
                                ]
                              }}
                              formats={['bold', 'italic', 'underline', 'link']}
                              style={{ minHeight: '100px' }}
                              placeholder="Write a couple sentences describing the desirable features that make this an attractive investment."
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4 mt-8">
                    <h3 className="text-base font-medium">Investment Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Include all information about your deal here. Include multi-media to make this section more attractive.
                    </p>
                    <FormField
                      control={form.control}
                      name="investmentSummary"
                      render={({ field }) => (
                        <FormItem>
                          <div className="border rounded-md">
                            <ReactQuill 
                              theme="snow"
                              value={field.value || ''}
                              onChange={field.onChange}
                              modules={{
                                toolbar: [
                                  [{ 'header': [1, 2, false] }],
                                  ['bold', 'italic', 'underline', 'link'],
                                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                  ['image', 'video', 'code-block'],
                                  ['clean']
                                ]
                              }}
                              formats={['header', 'bold', 'italic', 'underline', 'link', 'list', 'bullet', 'image', 'video', 'code-block']}
                              style={{ minHeight: '400px' }}
                              placeholder="Type something..."
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="mb-4">
                      <h3 className="text-base font-medium">Key Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Metrics such as IRR or Returns that will be displayed prominently.
                      </p>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="keyMetrics"
                      render={() => (
                        <FormItem>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Info Name</Label>
                              <Input 
                                placeholder="Info name (e.g. Expected Return)" 
                                value={newMetricName}
                                onChange={(e) => setNewMetricName(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Info Value</Label>
                              <div className="flex space-x-2">
                                <Input 
                                  placeholder="Info value (e.g. 10.0%)" 
                                  value={newMetricValue}
                                  onChange={(e) => setNewMetricValue(e.target.value)}
                                />
                                <Button 
                                  type="button"
                                  onClick={handleAddKeyMetric}
                                  disabled={!newMetricName || !newMetricValue}
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {keyMetrics.length > 0 && (
                            <div className="space-y-3 mt-4">
                              {keyMetrics.map((metric, index) => (
                                <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                                  <div className="flex items-center gap-3 w-full">
                                    <div className="w-1/2">
                                      <Input 
                                        value={metric.name} 
                                        onChange={(e) => handleKeyMetricChange(index, 'name', e.target.value)}
                                      />
                                    </div>
                                    <div className="w-1/2">
                                      <Input 
                                        value={metric.value} 
                                        onChange={(e) => handleKeyMetricChange(index, 'value', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDeleteKeyMetric(index)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Legacy fields kept for backward compatibility */}
                    <div className="sr-only">
                      <FormField
                        control={form.control}
                        name="capitalRaise"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postValuation"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="revenueProjection"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="exitRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="returnMultiple"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>EXTERNAL RESOURCES</CardTitle>
                  <CardDescription>
                    Add links to external resources such as pitch decks, websites, or documents.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="resourceLabel">Resource Label</Label>
                      <Input 
                        id="resourceLabel" 
                        value={newResourceLabel} 
                        onChange={(e) => setNewResourceLabel(e.target.value)} 
                        placeholder="e.g. Pitch Deck" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <Label htmlFor="resourceUrl">Resource URL</Label>
                      <Input 
                        id="resourceUrl" 
                        value={newResourceUrl} 
                        onChange={(e) => setNewResourceUrl(e.target.value)} 
                        placeholder="https://example.com/resource" 
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <Button 
                        type="button" 
                        onClick={handleAddResource}
                        disabled={!newResourceLabel || !newResourceUrl}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  {externalResources.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {externalResources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center">
                            <Link className="h-4 w-4 text-muted-foreground mr-2" />
                            <div>
                              <p className="font-medium">{resource.label}</p>
                              <p className="text-sm text-muted-foreground">{resource.url}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveResource(index)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ATTACHMENTS</CardTitle>
                  <CardDescription>
                    Upload documents to share with your potential investors.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingFiles}
                    className="w-full h-32 border-dashed flex flex-col items-center justify-center"
                  >
                    {uploadingFiles ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    ) : (
                      <>
                        <FileText className="h-6 w-6 mb-2" />
                        <span>Upload Files (PDF, DOC, XLS)</span>
                        <span className="text-xs text-muted-foreground mt-1">Drop files or click to browse</span>
                      </>
                    )}
                  </Button>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    multiple
                    onChange={handleFileUpload}
                  />
                  
                  {fileUploadError && (
                    <p className="text-sm text-red-500 mt-1">{fileUploadError}</p>
                  )}
                  
                  {files.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center">
                            {file.name.toLowerCase().endsWith('.pdf') ? (
                              <FileText className="h-4 w-4 text-red-500 mr-2" />
                            ) : file.name.toLowerCase().match(/\.(doc|docx)$/) ? (
                              <FileText className="h-4 w-4 text-blue-500 mr-2" />
                            ) : file.name.toLowerCase().match(/\.(xls|xlsx)$/) ? (
                              <FileText className="h-4 w-4 text-green-500 mr-2" />
                            ) : file.name.toLowerCase().match(/\.(ppt|pptx)$/) ? (
                              <FileText className="h-4 w-4 text-orange-500 mr-2" />
                            ) : (
                              <Paperclip className="h-4 w-4 text-muted-foreground mr-2" />
                            )}
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">{file.size}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>



              <CardFooter className="flex justify-end">
                <Button 
                  id="save-whitelabel-button"
                  type="submit" 
                  disabled={whitelabelMutation.isPending}
                >
                  {whitelabelMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="legal">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SUBSCRIPTION DOCUMENTS</CardTitle>
                <CardDescription>
                  Manage subscription documents and templates for this project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="w-full">
                    <Label htmlFor="upload-legal-file">Upload Template</Label>
                    <div className="flex mt-2">
                      <Input
                        type="file"
                        id="upload-legal-file"
                        className="flex-1"
                      />
                      <Button className="ml-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[400px]">Document Title</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              Subscription_Agreement.pdf
                            </div>
                          </TableCell>
                          <TableCell>Standard subscription agreement</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              Operating_Agreement.pdf
                            </div>
                          </TableCell>
                          <TableCell>Operating agreement for SPV</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GENERAL DISCLAIMER</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  className="min-h-[200px]" 
                  placeholder="Enter general disclaimer text that will be shown to investors..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>INVESTOR ACCREDITATION</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-base">
                  Configure investor accreditation requirements
                </div>
                <Button variant="outline">API Link</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KYC</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-base">
                  Enable KYC verification for investors
                </div>
                <Switch />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>E-SIGNATURE DOCUMENTS</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-base">
                  Configure e-signature document requirements
                </div>
                <Button variant="outline">Attachment</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>WIRING OPTIONS</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  className="min-h-[200px]" 
                  placeholder="Enter wiring instructions for investors..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>TEAM MEMBERS</CardTitle>
                <CardDescription>
                  Manage who has access to this project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h3 className="text-sm font-medium">Email Address</h3>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Access Level</h3>
                    </div>
                  </div>
                  
                  {project.users?.map((user: any, index: number) => {
                    // Handle user data which could be string or object
                    let email = '';
                    let initials = '';
                    let displayName = '';
                    
                    if (typeof user === 'string') {
                      email = user;
                      initials = user.split('@')[0].substring(0, 2).toUpperCase();
                      displayName = user;
                    } else if (user && typeof user === 'object') {
                      email = user.email || '';
                      // Safely access firstName and lastName
                      const firstName = user.firstName || '';
                      const lastName = user.lastName || '';
                      initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
                      displayName = `${firstName} ${lastName}`.trim() || email;
                    }
                    
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{displayName}</p>
                            {typeof user === 'object' && user.email && displayName !== user.email && 
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            }
                          </div>
                        </div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                            Editor
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium">Add Team Member</h3>
                  <div className="flex space-x-2">
                    <Input placeholder="Email address" />
                    <Button>Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>DOMAIN SETTINGS</CardTitle>
                <CardDescription>
                  Configure custom domain settings for this project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomain</Label>
                  <div className="flex">
                    <Input id="subdomain" value={project.subdomain || ''} readOnly />
                    <span className="flex items-center px-3 border border-l-0 rounded-r-md bg-muted">.finally-app.com</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is the default URL for your dealroom.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <Input id="customDomain" placeholder="dealroom.yourdomain.com" />
                  <p className="text-sm text-muted-foreground">
                    To use a custom domain, you'll need to update your DNS settings.
                  </p>
                </div>
                
                <Button variant="outline">Save Domain Settings</Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>DEALROOM SETTINGS</CardTitle>
                <CardDescription>
                  Control who can access your dealroom and how they can interact with it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Dealroom Settings</h3>
                  <div className="border rounded-md p-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <div className="flex items-center space-x-2">
                          <Switch id="public-access" />
                          <Label htmlFor="public-access">Public Access</Label>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Allow anyone with the link to view the dealroom
                        </div>
                      </div>

                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <div className="flex items-center space-x-2">
                          <Switch id="require-login" />
                          <Label htmlFor="require-login">Require Login</Label>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Users must have an account and be logged in to view the dealroom
                        </div>
                      </div>

                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <div className="flex items-center space-x-2">
                          <Switch id="approved-only" />
                          <Label htmlFor="approved-only">Approved Users Only</Label>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Only users you have explicitly approved can view this dealroom
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium">Access Requests</h3>
                  <div className="border rounded-md divide-y">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">john.doe@example.com</p>
                          <p className="text-xs text-muted-foreground">Requested: 2 days ago</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Deny</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dealroom Preview Modal */}
      {previewOpen && tempPreviewProject && (
        <DealroomPreview
          project={tempPreviewProject}
          isOpen={previewOpen} 
          onClose={() => {
            setPreviewOpen(false);
            // Reset the temp project when closing
            setTempPreviewProject(null);
          }}
          onSaveImages={handleSaveImages}
        />
      )}
      {previewOpen && !tempPreviewProject && project && (
        <DealroomPreview
          project={project}
          isOpen={previewOpen} 
          onClose={() => {
            setPreviewOpen(false);
          }}
          onSaveImages={handleSaveImages}
        />
      )}
      
      {/* Debug output for form values */}
      {console.log("Current form values for dealroom:", {
        capitalRaise: form.watch('capitalRaise'),
        postValuation: form.watch('postValuation'),
        revenueProjection: form.watch('revenueProjection'),
        exitRange: form.watch('exitRange'),
        returnMultiple: form.watch('returnMultiple'),
        investmentHeadline: form.watch('investmentHeadline')?.substring(0, 30) + '...',
        investmentSummary: form.watch('investmentSummary')?.substring(0, 30) + '...',
        showcaseImages: form.watch('showcaseImages')?.length,
        externalResources: externalResources?.length
      })}
    </div>
  );
}