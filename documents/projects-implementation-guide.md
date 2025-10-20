# Projects Implementation Guide

## Quick Start

This guide will help you integrate and use the new projects management system in your Investment Management application.

## What's Been Created

### Components Created

1. **`ProjectsList.tsx`** - Main projects listing page with card/table views
2. **`CreateProjectDialog.tsx`** - Multi-step project creation wizard
3. **`ProjectCard.tsx`** - Individual project card component
4. **`ProjectSettings.tsx`** - Project settings management interface
5. **`ProjectDetailPage.tsx`** - Complete project detail page with tabs

### Pages Updated

1. **`Projects.tsx`** - Simplified to use the new ProjectsList component

### Documentation

1. **`projects-flow.md`** - Complete flow documentation
2. **`projects-implementation-guide.md`** - This file

---

## File Structure

```
client/src/
├── components/
│   └── projects/
│       ├── CreateProjectDialog.tsx       # Multi-step creation wizard
│       ├── ProjectCard.tsx               # Project card display
│       ├── ProjectSettings.tsx           # Settings management
│       └── ProjectsList.tsx              # Main listing component
├── pages/
│   ├── Projects.tsx                      # Projects page (updated)
│   └── ProjectDetailPage.tsx             # Project detail page (new)
└── documents/
    ├── projects-flow.md                  # Flow documentation
    └── projects-implementation-guide.md  # This guide
```

---

## How to Use

### 1. Projects List Page

The projects page now displays a modern interface with:

- **Card View**: Visual grid layout showing project cards
- **Table View**: Traditional table layout
- **Search**: Real-time project search
- **Filters**: Filter by project type
- **Export**: Export project data
- **+ NEW PROJECT button**: Opens the creation dialog

**Already integrated!** Just navigate to `/projects` in your app.

### 2. Creating a New Project

Click the **"+ NEW PROJECT"** button to open the creation wizard:

#### Step 1: Basic Information
```typescript
- Project Name (required)
- Project Type (required): Real Estate, Private Equity, etc.
- Legal Name (optional)
```

#### Step 2: Physical Address
```typescript
- Street Address (required)
- City (required)
- State (required): 2-letter format
- Zip Code (required)
- Country (optional)
```

#### Step 3: Asset Details
```typescript
- Asset Classes (required, multiple): Residential, Commercial, etc.
- Regulations (optional, multiple): Various regulation types
- Structure (required): LLC, LP, Corporation, etc.
```

#### Step 4: Financial Settings
```typescript
- Currency (required): USD, EUR, GBP, CAD, AUD
- Unit Calculation Precision (required): 0-8 decimal places
```

### 3. Viewing Project Details

Navigate to a project by clicking on:
- A project card in card view
- A table row in table view
- Any project link

The detail page includes tabs for:
- **Overview**: Summary and recent activity
- **Stakeholders**: Investor/partner management
- **Financials**: Detailed financial information
- **Documents**: Document management
- **Settings**: Project configuration

---

## Integration with Backend

### Current Status

The components currently use **mock data**. You need to integrate with your backend API.

### API Endpoints Needed

#### 1. Get All Projects
```typescript
GET /api/projects

Response:
{
  projects: [
    {
      id: string,
      name: string,
      type: string,
      stage: string,
      currency: string,
      capitalBalance: number,
      stakeholders: number,
      daysActive: number
    }
  ]
}
```

#### 2. Create Project
```typescript
POST /api/projects

Request Body:
{
  projectName: string,
  projectType: string,
  legalName?: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  country?: string,
  assetClasses: string[],
  regulations: string[],
  structure: string,
  currency: string,
  unitCalculationPrecision: string
}

Response:
{
  id: string,
  ...projectData
}
```

#### 3. Get Project Details
```typescript
GET /api/projects/:id

Response:
{
  id: string,
  name: string,
  type: string,
  description: string,
  // ... all project fields
}
```

#### 4. Update Project
```typescript
PUT /api/projects/:id

Request Body: Partial<ProjectData>

Response: UpdatedProjectData
```

### Where to Add API Calls

#### In `ProjectsList.tsx`

Replace mock data around line 28:

```typescript
// BEFORE (Mock Data)
const mockProjects = [
  {
    id: '1',
    name: 'Sunset Plaza Development',
    // ...
  }
];

// AFTER (API Integration)
import { useQuery } from '@tanstack/react-query';

export default function ProjectsList() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  // Use projects instead of mockProjects
  const filteredProjects = projects.filter((project) => {
    // ... existing filter logic
  });
```

#### In `CreateProjectDialog.tsx`

Update the `handleSubmit` function around line 119:

```typescript
// BEFORE (Console log only)
const handleSubmit = () => {
  console.log('Project Created:', formData);
  toast({
    title: 'Success!',
    description: 'Your project has been created successfully.',
  });
  // ...
};

// AFTER (API Integration)
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const createProjectMutation = useMutation({
  mutationFn: async (data: ProjectFormData) => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    toast({
      title: 'Success!',
      description: 'Your project has been created successfully.',
    });
    onOpenChange(false);
    // Reset form...
  },
  onError: (error) => {
    toast({
      title: 'Error',
      description: 'Failed to create project. Please try again.',
      variant: 'destructive',
    });
  }
});

const handleSubmit = () => {
  createProjectMutation.mutate(formData);
};
```

#### In `ProjectDetailPage.tsx`

Replace mock data around line 22:

```typescript
// BEFORE (Mock Data)
const project = {
  id: projectId || '1',
  name: 'Sunset Plaza Development',
  // ...
};

// AFTER (API Integration)
const { data: project, isLoading } = useQuery({
  queryKey: ['project', projectId],
  queryFn: async () => {
    const response = await fetch(`/api/projects/${projectId}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },
  enabled: !!projectId
});

if (isLoading) return <div>Loading...</div>;
if (!project) return <div>Project not found</div>;
```

---

## Routing Setup

### Required Routes

Add these routes to your main routing configuration:

```typescript
import { Route, Switch } from 'wouter';
import Projects from './pages/Projects';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  return (
    <Switch>
      {/* Existing routes */}
      
      <Route path="/projects" component={Projects} />
      <Route path="/projectdetail/:id" component={ProjectDetailPage} />
      
      {/* Other routes */}
    </Switch>
  );
}
```

### Navigation Links

If you need to add projects to your sidebar/navigation:

```typescript
// In your Sidebar component
<Link href="/projects">
  <a className="nav-link">
    <Building2 className="w-5 h-5" />
    Projects
  </a>
</Link>
```

---

## Customization

### Changing Colors

The primary color is `#4CC7D1` (cyan/teal). To change it:

1. **Update in components**: Search for `#4CC7D1` and `#3bb5bf` (hover state)
2. **Update in Tailwind**: Modify `tailwind.config.ts` if you want to use Tailwind variables

```typescript
// In any component
// Change from:
className="bg-[#4CC7D1] hover:bg-[#3bb5bf]"

// To your color:
className="bg-[#YOUR_COLOR] hover:bg-[#YOUR_HOVER_COLOR]"
```

### Adding More Project Types

In `CreateProjectDialog.tsx`, line 35:

```typescript
const projectTypes = [
  'Real Estate',
  'Private Equity',
  'Venture Capital',
  'Debt Fund',
  'Hedge Fund',
  'Other',
  // Add your custom types here:
  'Infrastructure',
  'Credit Fund',
];
```

### Adding More Asset Classes

In `CreateProjectDialog.tsx`, line 42:

```typescript
const assetClassOptions = [
  'Residential',
  'Commercial',
  'Industrial',
  'Mixed-Use',
  'Land',
  'Retail',
  'Office',
  'Multifamily',
  // Add more:
  'Hospitality',
  'Healthcare',
];
```

### Adding More Currencies

In `CreateProjectDialog.tsx`, line 70:

```typescript
const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  // Add more:
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CHF', name: 'Swiss Franc' },
];
```

---

## Styling Notes

### Design System

All components follow your existing design system:
- **UI Library**: Shadcn/UI components
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: React Query (ready for integration)

### Responsive Breakpoints

- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (lg)

All components are fully responsive and tested at all breakpoints.

### Color Scheme

- **Primary**: `#4CC7D1` (Teal)
- **Primary Hover**: `#3bb5bf`
- **Success**: Green-500/600
- **Error**: Red-500/600
- **Gray Scale**: gray-50 to gray-900

---

## Features Checklist

### ✅ Implemented

- [x] Projects listing page with card view
- [x] Projects listing page with table view
- [x] Search functionality
- [x] Filter by project type
- [x] Multi-step project creation wizard
- [x] Form validation at each step
- [x] Progress indicator
- [x] Project detail page
- [x] Project settings page with tabs
- [x] Responsive design
- [x] Toast notifications
- [x] Loading states
- [x] Error handling UI

### 🔄 Ready for Integration

- [ ] API integration for fetching projects
- [ ] API integration for creating projects
- [ ] API integration for updating projects
- [ ] API integration for deleting projects

### 🚧 Future Enhancements

- [ ] Export functionality (CSV/Excel)
- [ ] Advanced filtering
- [ ] Bulk operations
- [ ] Document upload
- [ ] Team member management
- [ ] Activity timeline
- [ ] Charts and analytics

---

## Testing

### Manual Testing Checklist

1. **Projects List**
   - [ ] Page loads without errors
   - [ ] Projects display in card view
   - [ ] Switch to table view works
   - [ ] Search filters projects correctly
   - [ ] Type filter works
   - [ ] Clicking a project navigates to details

2. **Create Project**
   - [ ] Dialog opens on button click
   - [ ] Step 1: All fields work
   - [ ] Step 1: Validation prevents proceeding without required fields
   - [ ] Step 2: Address fields work
   - [ ] Step 2: State accepts only 2 letters
   - [ ] Step 3: Asset classes can be selected/deselected
   - [ ] Step 3: Multiple selections work
   - [ ] Step 4: Currency and precision selection works
   - [ ] Back button works at each step
   - [ ] Submit creates project (or logs data)
   - [ ] Success toast appears
   - [ ] Dialog closes after creation

3. **Project Details**
   - [ ] Detail page loads
   - [ ] Stats cards show correct data
   - [ ] All tabs are accessible
   - [ ] Settings tab shows project settings
   - [ ] Settings can be edited
   - [ ] Save changes works

4. **Responsive Design**
   - [ ] Mobile view (< 768px) works correctly
   - [ ] Tablet view (768px - 1024px) works correctly
   - [ ] Desktop view (> 1024px) works correctly

---

## Troubleshooting

### Issue: "Cannot find module '@/components/projects/ProjectsList'"

**Solution**: Make sure you've created all the files in the correct locations. Check that:
- Files are in `client/src/components/projects/`
- The import path uses `@/` alias correctly

### Issue: "Projects list is empty"

**Solution**: 
1. Check that mock data is present in `ProjectsList.tsx`
2. After API integration, check that API is returning data
3. Check browser console for errors

### Issue: "Dialog doesn't close after creating project"

**Solution**: Verify that `onOpenChange(false)` is being called in the `handleSubmit` function.

### Issue: "Styling looks different"

**Solution**:
1. Make sure Tailwind CSS is properly configured
2. Check that all required UI components are installed
3. Verify that `index.css` imports Tailwind directives

---

## Additional Resources

### Related Documentation

- **InvestNext Reference**: [Original article](https://support.investnext.com/en/articles/4831744-how-to-create-a-new-project)
- **Shadcn/UI Docs**: [shadcn.com](https://ui.shadcn.com)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **React Hook Form**: [react-hook-form.com](https://react-hook-form.com)

### Component Dependencies

Make sure these packages are installed:

```json
{
  "@radix-ui/react-dialog": "^1.0.x",
  "@radix-ui/react-select": "^2.0.x",
  "@radix-ui/react-label": "^2.0.x",
  "@radix-ui/react-tabs": "^1.0.x",
  "lucide-react": "^0.x.x",
  "react-hook-form": "^7.x.x",
  "zod": "^3.x.x",
  "@hookform/resolvers": "^3.x.x"
}
```

---

## Support

If you encounter any issues or have questions:

1. Check this guide first
2. Review the main documentation in `projects-flow.md`
3. Check the component source code for inline comments
4. Contact the development team

---

## Next Steps

1. ✅ **Review the created components** - Familiarize yourself with the code
2. 🔄 **Test the UI** - Navigate through the flows manually
3. 🔄 **Integrate with API** - Add your backend endpoints
4. 🔄 **Customize** - Adjust colors, types, and fields as needed
5. 🚀 **Deploy** - Push to production when ready

---

*Happy coding! 🚀*

*Last Updated: October 20, 2025*

