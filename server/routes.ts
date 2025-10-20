import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertProjectSchema, whitelabelUpdateSchema } from "@shared/schema";
import { setupAuth, comparePasswords, hashPassword } from "./auth";
import multer from "multer";
import fs from "fs";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // Default whitelabel settings
  const DEFAULT_WHITELABEL = {
    primaryColor: '#4CC7D1',
    enableRegistration: true,
    subtitle: '',
    logoUrl: '',
    description: '',
    showcaseImages: [],
    investmentDetails: '',
    enableSocialSharing: false,
    showFundraisingProgress: false,
    showTeamMembers: true,
    enableDocumentsSection: true,
    enableContactForm: false,
    contactFormRecipient: '',
    headerLinks: [],
    // Financial metrics
    capitalRaise: '',
    postValuation: '',
    revenueProjection: '',
    exitRange: '',
    returnMultiple: '',
    keyMetrics: [],
    externalResources: [],
    attachments: []
  };

  // Helper function to check user authentication
  const requireAuth = (req: Request, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };
  
  // Set up file uploads
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  // Configure multer for file uploads
  const upload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (req: any, file, cb) => {
        const userId = req.user.id;
        const fileExt = path.extname(file.originalname);
        cb(null, `avatar-${userId}-${Date.now()}${fileExt}`);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (_req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Only image files are allowed!"));
    }
  });
  
  // Configure multer for project showcase images
  const projectImagesUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (req: any, file, cb) => {
        const userId = req.user.id;
        const projectId = req.params.id || 'unknown';
        const fileExt = path.extname(file.originalname);
        cb(null, `project-${projectId}-${Date.now()}${fileExt}`);
      }
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (_req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif|webp/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Only image files are allowed!"));
    }
  });
  
  // Configure multer for project document files
  const projectFilesUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (req: any, file, cb) => {
        const userId = req.user.id;
        const projectId = req.params.id || 'unknown';
        const fileExt = path.extname(file.originalname);
        // Keep original filename but sanitize it to prevent path traversal
        const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9\-_\.]/g, '_');
        cb(null, `file-${projectId}-${Date.now()}-${safeOriginalName}`);
      }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
    fileFilter: (_req, file, cb) => {
      const filetypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|txt/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      
      if (extname) {
        return cb(null, true);
      }
      cb(new Error("Only document files (PDF, Office documents, TXT) are allowed!"));
    }
  });
  
  // Serve uploaded files
  app.use('/uploads', express.static(uploadsDir));

  // User profile routes
  app.patch("/api/user", requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      const userSchema = z.object({
        username: z.string().min(3).optional(),
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        email: z.string().email().optional(),
      });
      
      const userData = userSchema.parse(req.body);
      
      // Check if username already exists if updating username
      if (userData.username && userData.username !== req.user.username) {
        const existingUser = await storage.getUserByUsername(userData.username);
        if (existingUser) {
          return res.status(400).json({ message: "Username already exists" });
        }
      }
      
      const updatedUser = await storage.updateUser(userId, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Update the session
      Object.assign(req.user, updatedUser);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input data",
          errors: error.errors,
        });
        return;
      }
      
      res.status(500).json({
        message: "Failed to update user profile",
        error: (error as Error).message,
      });
    }
  });
  
  app.post("/api/user/password", requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      const passwordSchema = z.object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(8),
      });
      
      const passwordData = passwordSchema.parse(req.body);
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Verify current password
      const isPasswordValid = await comparePasswords(passwordData.currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      
      // Hash new password
      const hashedPassword = await hashPassword(passwordData.newPassword);
      
      // Update password
      await storage.updateUser(userId, {
        password: hashedPassword
      });
      
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input data",
          errors: error.errors,
        });
        return;
      }
      
      res.status(500).json({
        message: "Failed to update password",
        error: (error as Error).message,
      });
    }
  });
  
  app.post("/api/user/avatar", requireAuth, upload.single('avatar'), async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      const avatarUrl = `/uploads/${req.file.filename}`;
      
      // Update user avatar in database
      const updatedUser = await storage.updateUser(userId, {
        avatarUrl
      });
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Update the session
      Object.assign(req.user, updatedUser);
      
      res.status(200).json({ avatarUrl });
    } catch (error) {
      res.status(500).json({
        message: "Failed to upload avatar",
        error: (error as Error).message,
      });
    }
  });

  // Project routes
  app.get("/api/projects", requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const projects = await storage.getProjects(userId);
      
      res.status(200).json({
        projects,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch projects",
        error: (error as Error).message,
      });
    }
  });

  app.get("/api/projects/:id", requireAuth, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          message: "Invalid project ID",
        });
        return;
      }
      
      const project = await storage.getProject(id);
      
      if (!project) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      // Check if project belongs to user
      if (project.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to access this project",
        });
        return;
      }
      
      res.status(200).json({
        project,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch project",
        error: (error as Error).message,
      });
    }
  });

  app.post("/api/projects", requireAuth, async (req: any, res) => {
    try {
      const projectSchema = z.object({
        name: z.string().min(1),
        shortCode: z.string().min(1).max(5),
        status: z.enum(["active", "inactive"]).optional(),
        companyName: z.string().optional(),
        subdomain: z.string().optional(),
        users: z.array(z.string()).optional(),
      });

      const projectData = projectSchema.parse(req.body);
      const userId = req.user.id;
      
      const project = await storage.createProject({
        ...projectData,
        userId,
        whitelabel: DEFAULT_WHITELABEL,
      });
      
      res.status(201).json({
        message: "Project created successfully",
        project,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input data",
          errors: error.errors,
        });
        return;
      }
      
      res.status(500).json({
        message: "Failed to create project",
        error: (error as Error).message,
      });
    }
  });

  app.put("/api/projects/:id", requireAuth, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          message: "Invalid project ID",
        });
        return;
      }
      
      // Check if project exists and belongs to user
      const existingProject = await storage.getProject(id);
      if (!existingProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      if (existingProject.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to update this project",
        });
        return;
      }
      
      const projectSchema = z.object({
        name: z.string().min(1).optional(),
        shortCode: z.string().min(1).max(5).optional(),
        status: z.enum(["active", "inactive"]).optional(),
        companyName: z.string().optional(),
        subdomain: z.string().optional(),
        users: z.array(z.string()).optional(),
      });

      const projectData = projectSchema.parse(req.body);
      
      const project = await storage.updateProject(id, projectData);
      
      res.status(200).json({
        message: "Project updated successfully",
        project,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input data",
          errors: error.errors,
        });
        return;
      }
      
      res.status(500).json({
        message: "Failed to update project",
        error: (error as Error).message,
      });
    }
  });

  app.delete("/api/projects/:id", requireAuth, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          message: "Invalid project ID",
        });
        return;
      }
      
      // Check if project exists and belongs to user
      const existingProject = await storage.getProject(id);
      if (!existingProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      if (existingProject.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to delete this project",
        });
        return;
      }
      
      const success = await storage.deleteProject(id);
      
      if (!success) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      res.status(200).json({
        message: "Project deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete project",
        error: (error as Error).message,
      });
    }
  });
  
  // Upload project showcase images
  app.post("/api/projects/:id/images", requireAuth, projectImagesUpload.array('images', 5), async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          message: "Invalid project ID",
        });
        return;
      }
      
      // Check if project exists and belongs to user
      const existingProject = await storage.getProject(id);
      if (!existingProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      if (existingProject.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to update this project",
        });
        return;
      }
      
      if (!req.files || req.files.length === 0) {
        res.status(400).json({
          message: "No files uploaded",
        });
        return;
      }
      
      const files = Array.isArray(req.files) ? req.files : [req.files];
      const uploadedImages = files.map((file: any) => ({
        url: `/uploads/${file.filename}`,
        isMain: false
      }));
      
      // Get existing showcase images, if any
      const existingImages = existingProject.whitelabel?.showcaseImages || [];
      
      // If there are no existing images with isMain=true and we have at least one new image,
      // set the first new image as the main image
      if (!existingImages.some((img: any) => img.isMain) && uploadedImages.length > 0) {
        uploadedImages[0].isMain = true;
      }
      
      // Update project with the new images
      const whitelabel = {
        ...(existingProject.whitelabel || DEFAULT_WHITELABEL),
        showcaseImages: [...existingImages, ...uploadedImages],
      };
      
      const updatedProject = await storage.updateProject(id, { whitelabel });
      
      if (!updatedProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      res.status(200).json({
        message: "Images uploaded successfully",
        images: uploadedImages,
        project: updatedProject,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to upload project images",
        error: (error as Error).message,
      });
    }
  });
  
  // Set main showcase image
  app.put("/api/projects/:id/images/:imageIndex/main", requireAuth, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const imageIndex = parseInt(req.params.imageIndex);
      
      if (isNaN(id) || isNaN(imageIndex)) {
        res.status(400).json({
          message: "Invalid project ID or image index",
        });
        return;
      }
      
      // Check if project exists and belongs to user
      const existingProject = await storage.getProject(id);
      if (!existingProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      if (existingProject.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to update this project",
        });
        return;
      }
      
      const showcaseImages = existingProject.whitelabel?.showcaseImages || [];
      
      if (imageIndex < 0 || imageIndex >= showcaseImages.length) {
        res.status(400).json({
          message: "Invalid image index",
        });
        return;
      }
      
      // Update isMain flag for all images
      const updatedImages = showcaseImages.map((img: any, idx: number) => ({
        ...img,
        isMain: idx === imageIndex
      }));
      
      // Update project with the updated images
      const whitelabel = {
        ...(existingProject.whitelabel || DEFAULT_WHITELABEL),
        showcaseImages: updatedImages,
      };
      
      const updatedProject = await storage.updateProject(id, { whitelabel });
      
      if (!updatedProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      res.status(200).json({
        message: "Main image updated",
        project: updatedProject,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update main image",
        error: (error as Error).message,
      });
    }
  });
  
  // Delete showcase image
  app.delete("/api/projects/:id/images/:imageIndex", requireAuth, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const imageIndex = parseInt(req.params.imageIndex);
      
      if (isNaN(id) || isNaN(imageIndex)) {
        res.status(400).json({
          message: "Invalid project ID or image index",
        });
        return;
      }
      
      // Check if project exists and belongs to user
      const existingProject = await storage.getProject(id);
      if (!existingProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      if (existingProject.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to update this project",
        });
        return;
      }
      
      const showcaseImages = existingProject.whitelabel?.showcaseImages || [];
      
      if (imageIndex < 0 || imageIndex >= showcaseImages.length) {
        res.status(400).json({
          message: "Invalid image index",
        });
        return;
      }
      
      const deletedImage = showcaseImages[imageIndex];
      const wasMain = deletedImage.isMain;
      
      // Remove the image from the array
      const updatedImages = showcaseImages.filter((_: any, idx: number) => idx !== imageIndex);
      
      // If we deleted the main image and we have other images, set the first remaining image as main
      if (wasMain && updatedImages.length > 0) {
        updatedImages[0].isMain = true;
      }
      
      // Update project with the filtered images
      const whitelabel = {
        ...(existingProject.whitelabel || DEFAULT_WHITELABEL),
        showcaseImages: updatedImages,
      };
      
      const updatedProject = await storage.updateProject(id, { whitelabel });
      
      if (!updatedProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      res.status(200).json({
        message: "Image deleted",
        project: updatedProject,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete image",
        error: (error as Error).message,
      });
    }
  });
  
  // Upload project files (documents)
  app.post("/api/projects/:id/files", requireAuth, projectFilesUpload.array('files', 10), async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          message: "Invalid project ID",
        });
        return;
      }
      
      // Check if project exists and belongs to user
      const existingProject = await storage.getProject(id);
      if (!existingProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      if (existingProject.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to update this project",
        });
        return;
      }
      
      if (!req.files || req.files.length === 0) {
        res.status(400).json({
          message: "No files uploaded",
        });
        return;
      }
      
      const files = Array.isArray(req.files) ? req.files : [req.files];
      const uploadedFiles = files.map((file: any) => ({
        name: file.originalname,
        url: `/uploads/${file.filename}`,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        type: file.mimetype
      }));
      
      // Get existing attachments, if any
      const existingFiles = existingProject.whitelabel?.attachments || [];
      
      // Update project with the new files
      const whitelabel = {
        ...(existingProject.whitelabel || DEFAULT_WHITELABEL),
        attachments: [...existingFiles, ...uploadedFiles],
      };
      
      const updatedProject = await storage.updateProject(id, { whitelabel });
      
      if (!updatedProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      res.status(200).json({
        message: "Files uploaded successfully",
        files: uploadedFiles,
        project: updatedProject,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to upload files",
        error: (error as Error).message,
      });
    }
  });
  
  // Delete project file
  app.delete("/api/projects/:id/files/:fileIndex", requireAuth, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const fileIndex = parseInt(req.params.fileIndex);
      
      if (isNaN(id) || isNaN(fileIndex)) {
        res.status(400).json({
          message: "Invalid project ID or file index",
        });
        return;
      }
      
      // Check if project exists and belongs to user
      const existingProject = await storage.getProject(id);
      if (!existingProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      if (existingProject.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to update this project",
        });
        return;
      }
      
      const attachments = existingProject.whitelabel?.attachments || [];
      
      if (fileIndex < 0 || fileIndex >= attachments.length) {
        res.status(400).json({
          message: "Invalid file index",
        });
        return;
      }
      
      // Remove the file at the specified index
      const updatedFiles = [...attachments];
      updatedFiles.splice(fileIndex, 1);
      
      // Update project with the updated files
      const whitelabel = {
        ...(existingProject.whitelabel || DEFAULT_WHITELABEL),
        attachments: updatedFiles,
      };
      
      const updatedProject = await storage.updateProject(id, { whitelabel });
      
      if (!updatedProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      res.status(200).json({
        message: "File deleted successfully",
        project: updatedProject,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete file",
        error: (error as Error).message,
      });
    }
  });
  
  // Update project whitelabel settings
  app.patch("/api/projects/:id/whitelabel", requireAuth, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          message: "Invalid project ID",
        });
        return;
      }
      
      // Check if project exists and belongs to user
      const existingProject = await storage.getProject(id);
      if (!existingProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      if (existingProject.userId !== req.user.id) {
        res.status(403).json({
          message: "You don't have permission to update this project",
        });
        return;
      }
      
      // Use the extended whitelabel schema from shared/schema.ts
      const data = whitelabelUpdateSchema.parse(req.body);
      
      // Update whitelabel settings
      const whitelabel = {
        ...(existingProject.whitelabel || DEFAULT_WHITELABEL),
        ...data,
      };
      
      const updatedProject = await storage.updateProject(id, { whitelabel });
      
      if (!updatedProject) {
        res.status(404).json({
          message: "Project not found",
        });
        return;
      }
      
      res.status(200).json({
        message: "Whitelabel settings updated",
        project: updatedProject,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input data",
          errors: error.errors,
        });
        return;
      }
      
      res.status(500).json({
        message: "Failed to update whitelabel settings",
        error: (error as Error).message,
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
