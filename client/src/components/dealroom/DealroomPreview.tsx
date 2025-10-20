import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, FileText, Download, Paperclip, ArrowUp, ArrowDown, Trash, Check, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DealroomPreviewProps {
  project: any; // Using any temporarily to avoid type errors
  isOpen: boolean;
  onClose: () => void;
  onSaveImages?: (images: Array<{ url: string; isMain: boolean }>) => void; // Optional callback for saving images
}

export function DealroomPreview({ project, isOpen, onClose, onSaveImages }: DealroomPreviewProps) {
  // Add Toast hook for notifications
  const { toast } = useToast();
  console.log("DealroomPreview component rendering with isOpen =", isOpen);
  
  // Store project data in state to ensure it's preserved when dialog is open
  const [projectData, setProjectData] = useState<any>(null);
  // State for managing showcase images
  const [dealroomShowcaseImages, setDealroomShowcaseImages] = useState<Array<{ url: string; isMain: boolean }>>([]);
  
  // Update internal state when project prop changes
  useEffect(() => {
    if (project) {
      console.log("Project data received in DealroomPreview:", project);
      setProjectData(project);
      
      // Initialize showcase images from the project data - improve image extraction
      let images = [];
      
      // Check all possible paths where showcase images might be located
      if (project.whitelabel?.showcaseImages && project.whitelabel.showcaseImages.length > 0) {
        images = project.whitelabel.showcaseImages;
        console.log("Found images in project.whitelabel.showcaseImages:", images);
      } else if (project.project?.whitelabel?.showcaseImages && project.project.whitelabel.showcaseImages.length > 0) {
        images = project.project.whitelabel.showcaseImages;
        console.log("Found images in project.project.whitelabel.showcaseImages:", images);
      } else if (project.projects && project.projects[0]?.whitelabel?.showcaseImages && 
                project.projects[0].whitelabel.showcaseImages.length > 0) {
        images = project.projects[0].whitelabel.showcaseImages;
        console.log("Found images in project.projects[0].whitelabel.showcaseImages:", images);
      }
      
      // If we still don't have images, try to find them in nested structures
      if (images.length === 0 && project.project && project.project.whitelabel) {
        images = project.project.whitelabel.showcaseImages || [];
        console.log("Fallback: Found images in project.project.whitelabel:", images);
      }
      
      console.log("Final showcase images array:", images);
      
      if (images.length > 0) {
        // Make sure at least one image is marked as main
        const hasMainImage = images.some((img: { url: string; isMain?: boolean }) => img.isMain === true);
        if (!hasMainImage && images.length > 0) {
          images[0].isMain = true;
        }
      }
      
      setDealroomShowcaseImages([...images]);
    }
  }, [project]);
  
  // Function to move an image up in order
  const handleMoveImageUp = (index: number) => {
    if (index === 0 || dealroomShowcaseImages.length < 2) return; // Already at the top or not enough images
    
    const newImages = [...dealroomShowcaseImages];
    // Swap with previous image
    [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    setDealroomShowcaseImages(newImages);
  };
  
  // Function to move an image down in order
  const handleMoveImageDown = (index: number) => {
    if (index === dealroomShowcaseImages.length - 1 || dealroomShowcaseImages.length < 2) return; // Already at the bottom or not enough images
    
    const newImages = [...dealroomShowcaseImages];
    // Swap with next image
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    setDealroomShowcaseImages(newImages);
  };
  
  // Function to delete an image
  const handleDeleteImage = (index: number) => {
    const newImages = dealroomShowcaseImages.filter((_, i) => i !== index);
    setDealroomShowcaseImages(newImages);
  };
  
  // Function to set an image as the main image
  const handleSetMainImage = (index: number) => {
    const newImages = dealroomShowcaseImages.map((image, i) => ({
      ...image,
      isMain: i === index
    }));
    setDealroomShowcaseImages(newImages);
  };
  
  // Handler for saving image changes
  const handleSaveImages = () => {
    if (onSaveImages) {
      onSaveImages(dealroomShowcaseImages);
      toast({
        title: "Images saved successfully",
        description: "Your image order and main image have been updated.",
        variant: "default"
      });
    }
  };
  
  if (!projectData) {
    console.log("No project data available in DealroomPreview");
    return null;
  }
  
  // Process project structure - handle both direct project object or project inside an object 
  console.log("Raw projectData received:", JSON.stringify(projectData).substring(0, 300) + "...");
  
  const actualProject = 
    projectData.project ? projectData.project : 
    projectData.projects && Array.isArray(projectData.projects) ? projectData.projects[0] : 
    projectData;
  
  console.log("Processed project to display:", actualProject);
  
  // Get whitelabel with safe fallbacks, merging any data from both sources
  // First check if there's a whitelabel object in the root level (merged preview data)
  const mergedWhitelabel = projectData.whitelabel || {};
  // Then check the actual project's whitelabel data
  const projectWhitelabel = actualProject.whitelabel || {};
  
  // Combine both sources, prioritizing merged data
  const whitelabel = {
    ...projectWhitelabel,
    ...mergedWhitelabel,
    // Special handling for investment rich text content
    investmentHeadline: mergedWhitelabel.investmentHeadline || projectWhitelabel.investmentHeadline || '',
    investmentSummary: mergedWhitelabel.investmentSummary || projectWhitelabel.investmentSummary || '',
    // Financial metrics
    capitalRaise: mergedWhitelabel.capitalRaise || projectWhitelabel.capitalRaise || '',
    postValuation: mergedWhitelabel.postValuation || projectWhitelabel.postValuation || '',
    revenueProjection: mergedWhitelabel.revenueProjection || projectWhitelabel.revenueProjection || '',
    exitRange: mergedWhitelabel.exitRange || projectWhitelabel.exitRange || '',
    returnMultiple: mergedWhitelabel.returnMultiple || projectWhitelabel.returnMultiple || '',
    // Dynamic key metrics
    keyMetrics: mergedWhitelabel.keyMetrics || projectWhitelabel.keyMetrics || [],
    // Attachments
    attachments: mergedWhitelabel.attachments || projectWhitelabel.attachments || [],
  };
  
  // Display detailed whitelabel data debug info
  if (isOpen) {
    console.log("Detailed whitelabel data in DealroomPreview:", {
      showcaseImages: whitelabel.showcaseImages || [],
      investmentHeadline: whitelabel.investmentHeadline?.substring(0, 30) + "..." || 'Not specified',
      investmentSummary: whitelabel.investmentSummary?.substring(0, 30) + "..." || 'Not specified',
      capitalRaise: whitelabel.capitalRaise || 'Not specified',
      postValuation: whitelabel.postValuation || 'Not specified',
      revenueProjection: whitelabel.revenueProjection || 'Not specified',
      exitRange: whitelabel.exitRange || 'Not specified',
      returnMultiple: whitelabel.returnMultiple || 'Not specified',
      attachments: whitelabel.attachments || [],
    });
    
    // Additional debug logging for attachments
    console.log("Attachments in DealroomPreview:", whitelabel.attachments);
    
    // Additional debug info
    console.log("Investment content check:", {
      headline: {
        value: whitelabel.investmentHeadline,
        isTruthy: !!whitelabel.investmentHeadline,
        length: whitelabel.investmentHeadline?.length || 0,
        isEmpty: whitelabel.investmentHeadline === '',
        isNull: whitelabel.investmentHeadline === null,
        isUndefined: whitelabel.investmentHeadline === undefined
      },
      summary: {
        value: whitelabel.investmentSummary,
        isTruthy: !!whitelabel.investmentSummary,
        length: whitelabel.investmentSummary?.length || 0,
        isEmpty: whitelabel.investmentSummary === '',
        isNull: whitelabel.investmentSummary === null,
        isUndefined: whitelabel.investmentSummary === undefined
      }
    });
  }
  
  // Main image comes from the dealroomShowcaseImages state
  const mainImage = dealroomShowcaseImages.length > 0
    ? (dealroomShowcaseImages.find((img: { url: string; isMain?: boolean }) => img.isMain)?.url || dealroomShowcaseImages[0].url)
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-10 bg-white border-b p-4">
          <DialogTitle className="flex justify-between items-center">
            <span className="text-lg font-semibold">Dealroom Preview</span>
            <div className="flex space-x-2">
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center" 
                onClick={() => window.open(`https://${actualProject.subdomain || 'demo'}.finally-app.com`, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-0">
          {/* Hero section with main image and title */}
          <div className="relative">
            {mainImage && (
              <div className="w-full h-64 md:h-80 overflow-hidden">
                <img 
                  src={mainImage} 
                  alt={actualProject.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {actualProject.name}
                  </h1>
                  {whitelabel.subtitle && (
                    <p className="text-white/80 text-lg mt-2">{whitelabel.subtitle}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2">
              {/* Investment headline - rendered always if available, no conditional */}
              <div className="mb-6">
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: whitelabel.investmentHeadline || '' }}
                />
              </div>

              {/* Investment summary - rendered always if available, no conditional */}
              <div className="mb-8">
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: whitelabel.investmentSummary || '' }}
                />
              </div>

              {/* Gallery */}
              {dealroomShowcaseImages.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">All Images</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {dealroomShowcaseImages.map((image: { url: string; isMain?: boolean }, index: number) => (
                      <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
                        <img 
                          src={image.url} 
                          alt={`${actualProject.name || 'Project'} - image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Order indicator */}
                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                          #{index + 1}
                        </div>
                        
                        {/* No image controls in preview mode */}
                        
                        {image.isMain && (
                          <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Attachments */}
              {whitelabel.attachments && whitelabel.attachments.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Attachments</h3>
                  <div className="space-y-2">
                    {whitelabel.attachments.map((file: { name: string; url: string; size?: string }, index: number) => (
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
                        <a 
                          href={file.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          <span className="text-sm">Download</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-1">
              <div className="bg-slate-50 rounded-lg p-6 sticky top-20">
                <h3 className="text-sm text-slate-500 font-medium mb-6 uppercase">KEY INFORMATION</h3>
                


                <div className="my-8">
                  <Button 
                    className="w-full bg-[#4CC7D1] hover:bg-[#3BB7C1] text-white font-medium" 
                    size="lg"
                  >
                    Invest Now
                  </Button>
                </div>

                {/* Show dynamic key metrics if available */}
                {whitelabel.keyMetrics && whitelabel.keyMetrics.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {whitelabel.keyMetrics.map((metric: { name: string; value: string }, index: number) => (
                      <div key={index}>
                        <h4 className="text-sm text-slate-500">{metric.name}</h4>
                        <p className="text-xl font-medium mt-1">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Documents section */}
                {whitelabel.externalResources && Array.isArray(whitelabel.externalResources) && whitelabel.externalResources.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm text-slate-500 font-medium mb-4 uppercase">Documents</h3>
                    <div className="space-y-2">
                      {whitelabel.externalResources.map((resource: { label: string; url: string }, index: number) => (
                        <div key={index} className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2 text-slate-400" />
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {resource.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}