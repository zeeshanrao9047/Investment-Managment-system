import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  avatarUrl: text("avatar_url"),
});

// Define Whitelabel schema for typechecking
export const showcaseImageSchema = z.object({
  url: z.string(),
  isMain: z.boolean().default(false),
});

// Define key metric schema for dynamic financial metrics
export const keyMetricSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const whitelabelSchema = z.object({
  subtitle: z.string().optional(),
  primaryColor: z.string().default("#4CC7D1"),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  enableRegistration: z.boolean().default(true),
  showcaseImages: z.array(showcaseImageSchema).default([]),
  investmentHeadline: z.string().optional(),
  investmentSummary: z.string().optional(),
  enableSocialSharing: z.boolean().default(false),
  showFundraisingProgress: z.boolean().default(false),
  showTeamMembers: z.boolean().default(true),
  enableDocumentsSection: z.boolean().default(true),
  enableContactForm: z.boolean().default(false),
  contactFormRecipient: z.string().optional(),
  headerLinks: z.array(z.object({
    label: z.string(),
    url: z.string()
  })).default([]),
  // Financial metrics
  capitalRaise: z.string().optional(),
  postValuation: z.string().optional(),
  revenueProjection: z.string().optional(),
  exitRange: z.string().optional(),
  returnMultiple: z.string().optional(),
  // Dynamic key metrics
  keyMetrics: z.array(keyMetricSchema).default([]),
  // Resources and attachments
  externalResources: z.array(z.object({
    label: z.string(),
    url: z.string()
  })).default([]),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    size: z.string().optional(),
    type: z.string().optional()
  })).default([]),
});

export type Whitelabel = z.infer<typeof whitelabelSchema>;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortCode: text("short_code").notNull(),
  status: text("status").notNull().default("active"),
  companyName: text("company_name"),
  subdomain: text("subdomain"),
  users: text("users").array(),
  userId: integer("user_id").references(() => users.id).notNull(),
  whitelabel: jsonb("whitelabel").$type<Whitelabel>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
  avatarUrl: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  shortCode: true,
  status: true,
  companyName: true,
  subdomain: true,
  users: true,
  userId: true,
  whitelabel: true,
});

export const whitelabelUpdateSchema = whitelabelSchema.extend({
  title: z.string().min(1, "Title is required"),
  // Add the new fields to whitelabelUpdateSchema explicitly
  investmentHeadline: z.string().optional(),
  investmentSummary: z.string().optional(),
  enableSocialSharing: z.boolean().optional(),
  showFundraisingProgress: z.boolean().optional(),
  showTeamMembers: z.boolean().optional(),
  enableDocumentsSection: z.boolean().optional(),
  enableContactForm: z.boolean().optional(),
  contactFormRecipient: z.string().optional(),
  headerLinks: z.array(z.object({
    label: z.string(),
    url: z.string()
  })).optional(),
  // Financial metrics
  capitalRaise: z.string().optional(),
  postValuation: z.string().optional(),
  revenueProjection: z.string().optional(),
  exitRange: z.string().optional(),
  returnMultiple: z.string().optional(),
  // Dynamic key metrics
  keyMetrics: z.array(keyMetricSchema).optional(),
  // Resources and attachments
  externalResources: z.array(z.object({
    label: z.string(),
    url: z.string()
  })).optional(),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    size: z.string().optional(),
    type: z.string().optional()
  })).optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;