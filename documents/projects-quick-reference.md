# Projects - Quick Reference Guide

## 🎯 Quick Overview

Your Investment Management System now has a complete project management flow inspired by InvestNext, with modern UI and full CRUD capabilities.

---

## 📁 File Locations

```
client/src/
├── components/projects/
│   ├── CreateProjectDialog.tsx     ← Multi-step creation wizard
│   ├── ProjectCard.tsx             ← Project card display
│   ├── ProjectSettings.tsx         ← Settings interface
│   └── ProjectsList.tsx            ← Main listing component
└── pages/
    ├── Projects.tsx                ← Projects page (updated)
    └── ProjectDetailPage.tsx       ← Project detail page (new)
```

---

## 🚀 User Flow

```
1. User visits /projects
   ↓
2. Sees list of projects (card or table view)
   ↓
3. Clicks "+ NEW PROJECT" button
   ↓
4. Completes 4-step wizard:
   • Step 1: Basic info (name, type, legal name)
   • Step 2: Address (street, city, state, zip)
   • Step 3: Asset details (classes, regulations, structure)
   • Step 4: Financial (currency, precision)
   ↓
5. Clicks "Create Project"
   ↓
6. Project appears in list
   ↓
7. User clicks project to view details
   ↓
8. Navigates through tabs:
   • Overview
   • Stakeholders
   • Financials
   • Documents
   • Settings (can edit project)
```

---

## 🎨 Visual Components

### Projects List Page
```
┌─────────────────────────────────────────────────┐
│ Projects                    [+ NEW PROJECT]      │
│ Manage and track all your investment projects   │
├─────────────────────────────────────────────────┤
│ [Search...] [Filter ▼]          [Filter][Export]│
├─────────────────────────────────────────────────┤
│ [Card View] [Table View]                        │
├─────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Project 1│  │ Project 2│  │ Project 3│     │
│  │          │  │          │  │          │     │
│  │ $2.5M    │  │ $5.0M    │  │ $8.7M    │     │
│  │ 45 inv.  │  │ 28 inv.  │  │ 67 inv.  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
```

### Create Project Dialog
```
┌─────────────────────────────────────────────┐
│  Create New Project                    [×]  │
├─────────────────────────────────────────────┤
│  ●─────●─────○─────○  (Progress: Step 2/4) │
│  Step 2 of 4: Physical Address              │
├─────────────────────────────────────────────┤
│  Street Address *                           │
│  [_____________________________]            │
│                                             │
│  City *              State *                │
│  [______________]    [__]  (2-letter)       │
│                                             │
│  Zip Code *          Country                │
│  [______________]    [______________]       │
├─────────────────────────────────────────────┤
│              [← Back]        [Next →]       │
└─────────────────────────────────────────────┘
```

### Project Detail Page
```
┌─────────────────────────────────────────────────┐
│ Sunset Plaza Development                        │
│ A luxury residential development in LA          │
│ [Real Estate] [Active]                          │
├─────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────┐│
│ │$2.5M     │ │45        │ │180       │ │$125K││
│ │Balance   │ │Investors │ │Days      │ │Income││
│ └──────────┘ └──────────┘ └──────────┘ └─────┘│
├─────────────────────────────────────────────────┤
│[Overview][Stakeholders][Financials][Docs][⚙]  │
├─────────────────────────────────────────────────┤
│ Content based on selected tab...               │
└─────────────────────────────────────────────────┘
```

---

## 🔑 Key Features

### ✅ What Works Now

| Feature | Status | Description |
|---------|--------|-------------|
| Projects List | ✅ Ready | View all projects in card/table format |
| Search | ✅ Ready | Real-time search by project name |
| Filter | ✅ Ready | Filter by project type |
| Create Project | ✅ Ready | 4-step wizard with validation |
| Project Details | ✅ Ready | Comprehensive detail page |
| Settings | ✅ Ready | Edit project configuration |
| Responsive | ✅ Ready | Mobile, tablet, desktop support |

### 🔄 Needs Backend

| Feature | Status | Action Needed |
|---------|--------|---------------|
| Fetch Projects | 🔄 Mock Data | Connect to `GET /api/projects` |
| Create Project | 🔄 Console Log | Connect to `POST /api/projects` |
| Update Project | 🔄 Mock Data | Connect to `PUT /api/projects/:id` |
| Delete Project | ⏳ Not Impl. | Add `DELETE /api/projects/:id` |

---

## 💻 Code Snippets

### Import and Use ProjectsList
```typescript
import ProjectsList from '@/components/projects/ProjectsList';

function ProjectsPage() {
  return (
    <main className="p-5">
      <ProjectsList />
    </main>
  );
}
```

### Import and Use CreateProjectDialog
```typescript
import { useState } from 'react';
import CreateProjectDialog from '@/components/projects/CreateProjectDialog';
import { Button } from '@/components/ui/button';

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Create Project
      </Button>
      <CreateProjectDialog 
        open={open} 
        onOpenChange={setOpen} 
      />
    </>
  );
}
```

### Fetch Projects with React Query
```typescript
import { useQuery } from '@tanstack/react-query';

const { data: projects } = useQuery({
  queryKey: ['projects'],
  queryFn: async () => {
    const res = await fetch('/api/projects');
    return res.json();
  }
});
```

---

## 🎨 Customization Quick Refs

### Change Primary Color
```typescript
// Find and replace in all components:
className="bg-[#4CC7D1]"     // Current teal
className="bg-[#YOUR_COLOR]" // Your color
```

### Add Project Type
```typescript
// In CreateProjectDialog.tsx, line ~35
const projectTypes = [
  'Real Estate',
  'Your New Type', // Add here
];
```

### Add Currency
```typescript
// In CreateProjectDialog.tsx, line ~70
const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'NEW', name: 'New Currency' }, // Add here
];
```

---

## 🔍 Component Props Reference

### CreateProjectDialog
```typescript
interface CreateProjectDialogProps {
  open: boolean;              // Controls dialog visibility
  onOpenChange: (open: boolean) => void; // Callback when state changes
}
```

### ProjectCard
```typescript
interface ProjectCardProps {
  id: string;                 // Unique project ID
  name: string;               // Project name
  type: string;               // Project type
  stage: string;              // Active, Fundraising, etc.
  currency: string;           // USD, EUR, etc.
  capitalBalance: number;     // Current capital balance
  stakeholders: number;       // Number of investors
  daysActive: number;         // Days since creation
}
```

### ProjectSettings
```typescript
interface ProjectSettingsProps {
  projectId?: string;         // Optional project ID for fetching
}
```

---

## 📊 Data Structure

### Project Object
```typescript
interface Project {
  // Basic Info
  id: string;
  name: string;
  type: string;
  legalName?: string;
  
  // Address
  address: string;
  city: string;
  state: string;    // 2-letter: CA, TX, NY
  zipCode: string;
  country?: string;
  
  // Asset Details
  assetClasses: string[];     // ['Residential', 'Commercial']
  regulations: string[];      // ['Regulation D - 506(b)']
  structure: string;          // 'LLC', 'LP', etc.
  
  // Financial
  currency: string;           // 'USD', 'EUR', etc.
  unitCalculationPrecision: string; // '0', '2', '4', '6', '8'
  
  // Computed/Status
  stage: string;              // 'Active', 'Fundraising', 'Closed'
  capitalBalance: number;
  stakeholders: number;
  daysActive: number;
  contributions: number;
  distributions: number;
  accruedIncome: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🛠️ Common Tasks

### Task: Add Backend Integration
1. Open `ProjectsList.tsx`
2. Replace mock data with `useQuery`
3. Open `CreateProjectDialog.tsx`
4. Replace `handleSubmit` with `useMutation`
5. Test with your API

### Task: Change Color Theme
1. Search for `#4CC7D1` in all project files
2. Replace with your color
3. Search for `#3bb5bf` (hover state)
4. Replace with darker shade

### Task: Add New Field to Creation Form
1. Open `CreateProjectDialog.tsx`
2. Add field to `ProjectFormData` interface
3. Add input in appropriate step (step 1-4)
4. Add to validation in `validateStep`
5. Include in `handleSubmit`

### Task: Add New Tab to Detail Page
1. Open `ProjectDetailPage.tsx`
2. Add tab to `TabsList`
3. Add corresponding `TabsContent`
4. Create content component if needed

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Projects not showing | Check mock data in `ProjectsList.tsx` line 28 |
| Dialog won't open | Verify `open` and `onOpenChange` props |
| Validation not working | Check `validateStep()` in `CreateProjectDialog.tsx` |
| Routing not working | Verify route in `App.tsx` |
| Styling looks wrong | Ensure Tailwind is configured correctly |
| Icons not showing | Check `lucide-react` is installed |

---

## 📞 Getting Help

1. **Check Documentation**
   - `projects-flow.md` - Complete flow documentation
   - `projects-implementation-guide.md` - Detailed implementation guide
   - This file - Quick reference

2. **Check Code Comments**
   - All components have inline comments
   - Prop types are documented with TypeScript

3. **Check Console**
   - Browser console for errors
   - Network tab for API calls

---

## 🎓 Learning Resources

- **Shadcn/UI**: [ui.shadcn.com](https://ui.shadcn.com)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Hook Form**: [react-hook-form.com](https://react-hook-form.com)
- **React Query**: [tanstack.com/query](https://tanstack.com/query)
- **Lucide Icons**: [lucide.dev](https://lucide.dev)

---

## ✅ Implementation Checklist

### Phase 1: Setup ✅
- [x] Create components
- [x] Update Projects page
- [x] Create detail page
- [x] Add routing
- [x] Create documentation

### Phase 2: Integration 🔄
- [ ] Connect to backend API
- [ ] Test CRUD operations
- [ ] Add error handling
- [ ] Add loading states

### Phase 3: Enhancement ⏳
- [ ] Add analytics
- [ ] Add export functionality
- [ ] Add bulk operations
- [ ] Add advanced filtering

---

## 📝 Notes

- All components use **Tailwind CSS** for styling
- **Shadcn/UI** components for consistent design
- **React Hook Form** + **Zod** for form validation
- **Lucide React** for icons
- **Responsive** by default
- **Accessible** WCAG compliant

---

## 🎉 You're All Set!

Everything is ready to use. Just:
1. Navigate to `/projects`
2. Click "+ NEW PROJECT"
3. Create your first project!

For backend integration, see `projects-implementation-guide.md`.

---

*Quick Reference v1.0 - October 20, 2025*

