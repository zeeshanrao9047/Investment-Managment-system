# Projects Flow Documentation

## Overview
This document outlines the complete project management flow implemented in the Investment Management System, based on the InvestNext project creation workflow.

## Table of Contents
1. [Project Creation Flow](#project-creation-flow)
2. [Components Structure](#components-structure)
3. [Features](#features)
4. [Usage Guide](#usage-guide)
5. [API Integration Points](#api-integration-points)

---

## Project Creation Flow

### Step-by-Step Process

#### Step 1: Basic Information
- **Project Name** (Required)
  - Primary identifier for the project
  - Must be unique within the system
  
- **Project Type** (Required)
  - Available types:
    - Real Estate
    - Private Equity
    - Venture Capital
    - Debt Fund
    - Hedge Fund
    - Other
    
- **Legal Name** (Optional)
  - Legal entity name
  - Used for official documentation

#### Step 2: Physical Address
- **Street Address** (Required)
- **City** (Required)
- **State** (Required)
  - Format: 2-letter abbreviation (e.g., CA, TX, NY)
- **Zip Code** (Required)
- **Country** (Optional)

#### Step 3: Asset Details
- **Asset Class(es)** (Required - Multiple Selection)
  - Residential
  - Commercial
  - Industrial
  - Mixed-Use
  - Land
  - Retail
  - Office
  - Multifamily

- **Relevant Regulation(s)** (Optional - Multiple Selection)
  - Regulation D - 506(b)
  - Regulation D - 506(c)
  - Regulation A+
  - Regulation CF
  - Regulation S
  - None

- **Structure** (Required)
  - LLC
  - LP
  - Corporation
  - Trust
  - Partnership
  - Other

#### Step 4: Financial Settings
- **Currency** (Required)
  - USD (US Dollar)
  - EUR (Euro)
  - GBP (British Pound)
  - CAD (Canadian Dollar)
  - AUD (Australian Dollar)

- **Unit Calculation Precision** (Required)
  - 0, 2, 4, 6, or 8 decimal places
  - Default: 2 decimal places

---

## Components Structure

### Primary Components

#### 1. `ProjectsList.tsx`
**Location:** `/client/src/components/projects/ProjectsList.tsx`

**Purpose:** Main container component for displaying and managing projects

**Features:**
- Project listing in card or table view
- Search functionality
- Filter by project type
- Export and filter options
- "+ NEW PROJECT" button to trigger creation dialog

**Key Props:**
- None (self-contained)

**State Management:**
```typescript
- isCreateDialogOpen: boolean
- searchTerm: string
- filterType: string
- viewMode: 'cards' | 'table'
```

#### 2. `CreateProjectDialog.tsx`
**Location:** `/client/src/components/projects/CreateProjectDialog.tsx`

**Purpose:** Multi-step dialog for creating new projects

**Features:**
- 4-step wizard interface
- Form validation at each step
- Progress indicator
- Back/Next navigation
- Success confirmation

**Key Props:**
```typescript
interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

**Form Data Structure:**
```typescript
interface ProjectFormData {
  projectName: string;
  projectType: string;
  legalName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  assetClasses: string[];
  regulations: string[];
  structure: string;
  currency: string;
  unitCalculationPrecision: string;
}
```

#### 3. `ProjectCard.tsx`
**Location:** `/client/src/components/projects/ProjectCard.tsx`

**Purpose:** Individual project card display component

**Features:**
- Gradient header with project name and type
- Key metrics display (capital balance, stakeholders, days active)
- Clickable to navigate to project details
- Hover effects

**Key Props:**
```typescript
interface ProjectCardProps {
  id: string;
  name: string;
  type: string;
  stage: string;
  currency: string;
  capitalBalance: number;
  stakeholders: number;
  daysActive: number;
}
```

#### 4. `ProjectSettings.tsx`
**Location:** `/client/src/components/projects/ProjectSettings.tsx`

**Purpose:** Project settings management interface

**Features:**
- Tabbed interface for different setting categories
- General information editing
- Address management
- Asset details configuration
- Financial settings

**Key Props:**
```typescript
interface ProjectSettingsProps {
  projectId?: string;
}
```

---

## Features

### 1. Project Listing
- **Card View**: Visual grid layout with project cards
- **Table View**: Tabular format with sortable columns
- **Real-time Search**: Filter projects by name
- **Type Filtering**: Filter by project type
- **Export Functionality**: Export project data

### 2. Project Creation
- **Multi-step Wizard**: 4-step process for complete project setup
- **Form Validation**: Client-side validation at each step
- **Progress Tracking**: Visual progress indicator
- **Success Feedback**: Toast notifications for user actions

### 3. Project Management
- **Settings Page**: Comprehensive settings interface
- **Project Details**: Detailed view of project information
- **Edit Capabilities**: Update project information after creation

### 4. User Interface
- **Responsive Design**: Mobile-first responsive layout
- **Consistent Styling**: Follows existing design system
- **Accessible**: WCAG compliant components
- **Modern UI**: Clean, professional interface

---

## Usage Guide

### For Developers

#### Adding a New Project
```typescript
// In your page component
import ProjectsList from '@/components/projects/ProjectsList';

function ProjectsPage() {
  return <ProjectsList />;
}
```

#### Customizing Project Types
Edit the `projectTypes` array in `CreateProjectDialog.tsx`:
```typescript
const projectTypes = [
  'Real Estate',
  'Private Equity',
  // Add your custom types here
];
```

#### Integrating with Backend API

Replace mock data in `ProjectsList.tsx`:
```typescript
// Replace mock data
const mockProjects = [...];

// With API call
const { data: projects } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects
});
```

Implement save functionality in `CreateProjectDialog.tsx`:
```typescript
const handleSubmit = async () => {
  try {
    await createProject(formData);
    toast({
      title: 'Success!',
      description: 'Your project has been created successfully.',
    });
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to create project.',
      variant: 'destructive',
    });
  }
};
```

### For End Users

#### Creating a New Project

1. Navigate to the **Projects** page
2. Click the **"+ NEW PROJECT"** button in the top right
3. Complete the 4-step wizard:
   - Step 1: Enter basic project information
   - Step 2: Provide the physical address
   - Step 3: Select asset classes and structure
   - Step 4: Configure financial settings
4. Review your information and click **"Create Project"**
5. You'll be redirected to the projects list with your new project

#### Viewing Projects

**Card View:**
- Visual cards showing key project metrics
- Click any card to view full project details

**Table View:**
- Comprehensive tabular display
- Sortable columns
- Click any row to view project details

#### Managing Project Settings

1. Navigate to a specific project
2. Go to the **Settings** tab
3. Edit information across four categories:
   - General: Basic project information
   - Address: Physical location details
   - Asset Details: Classifications and structure
   - Financial: Currency and calculation settings
4. Click **"Save Changes"** to update

---

## API Integration Points

### Endpoints to Implement

#### 1. Get Projects List
```typescript
GET /api/projects
Response: Project[]
```

#### 2. Create Project
```typescript
POST /api/projects
Body: ProjectFormData
Response: { id: string, ...ProjectFormData }
```

#### 3. Get Project Details
```typescript
GET /api/projects/:id
Response: ProjectDetails
```

#### 4. Update Project
```typescript
PUT /api/projects/:id
Body: Partial<ProjectFormData>
Response: ProjectDetails
```

#### 5. Delete Project
```typescript
DELETE /api/projects/:id
Response: { success: boolean }
```

### Data Models

#### Project Model (Backend)
```typescript
interface Project {
  id: string;
  projectName: string;
  projectType: string;
  legalName?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  assetClasses: string[];
  regulations: string[];
  structure: string;
  currency: string;
  unitCalculationPrecision: number;
  stage: 'Active' | 'Fundraising' | 'Closed';
  capitalBalance: number;
  stakeholders: number;
  daysActive: number;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Styling and Theming

### Color Palette
- Primary: `#4CC7D1` (Cyan/Teal)
- Primary Hover: `#3bb5bf`
- Background: White/Gray scale
- Text: Gray-900 to Gray-500

### Component Patterns
All components follow the existing design system:
- Shadcn/UI components
- Tailwind CSS utility classes
- Consistent spacing and typography
- Responsive breakpoints

---

## Testing Checklist

- [ ] Create project with all required fields
- [ ] Validate form inputs at each step
- [ ] Navigate back and forth between steps
- [ ] Cancel project creation
- [ ] View projects in card mode
- [ ] View projects in table mode
- [ ] Search for projects
- [ ] Filter by project type
- [ ] Click project to view details
- [ ] Edit project settings
- [ ] Save project settings
- [ ] Delete project (when implemented)

---

## Future Enhancements

1. **Bulk Operations**
   - Multi-select projects
   - Bulk delete/archive
   - Bulk export

2. **Advanced Filtering**
   - Filter by multiple criteria
   - Save filter presets
   - Custom filter builder

3. **Project Analytics**
   - Dashboard for project metrics
   - Charts and graphs
   - Performance tracking

4. **Document Management**
   - Upload project documents
   - Document versioning
   - Document sharing

5. **Collaboration Features**
   - Team member assignments
   - Comments and notes
   - Activity timeline

---

## Support and Maintenance

### Common Issues

**Issue:** Dialog doesn't open
**Solution:** Check that `open` and `onOpenChange` props are properly connected

**Issue:** Form validation not working
**Solution:** Verify all required fields have validation in `validateStep()`

**Issue:** Styling inconsistencies
**Solution:** Ensure all Tailwind classes are consistent with existing components

### Contact
For questions or support, please contact the development team.

---

## Version History

- **v1.0.0** (2025-10-20): Initial implementation
  - Multi-step project creation dialog
  - Projects listing with card and table views
  - Project settings page
  - Search and filter functionality

---

*Last Updated: October 20, 2025*

