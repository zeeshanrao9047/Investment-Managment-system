import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import CreateProjectDialog from './CreateProjectDialog';
import { Plus, Search, Grid3x3, LayoutGrid, Star } from 'lucide-react';
import { Link } from 'wouter';

// Mock data - replace with actual API call
const mockFavoriteProjects = [
  {
    id: '1',
    name: 'Albert Park Apartments',
    status: 'Active',
    image: '/placeholder-project.jpg',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Alto Group | Fund 1',
    status: 'Active',
    image: '/placeholder-project.jpg',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Alto Group | Fund 2',
    status: 'Active',
    image: '/placeholder-project.jpg',
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Ice Cream Villas',
    status: 'Active',
    image: '/placeholder-project.jpg',
    isFavorite: true,
  },
  {
    id: '5',
    name: 'Industrial Park',
    status: 'Active',
    image: '/placeholder-project.jpg',
    isFavorite: true,
  },
  {
    id: '6',
    name: 'The Green Fund',
    status: 'Active',
    image: '/placeholder-project.jpg',
    isFavorite: true,
  },
];

const mockAllProjects = [
  {
    id: '7',
    name: '123',
    status: 'Active',
    initials: '12',
    type: 'Real Estate',
    country: 'USA',
    currency: 'USD',
    daysSinceContribution: 45,
    stakeholders: 12,
    paymentAccounts: 3,
    capitalBalance: 500000,
    contributions: 600000,
    distributions: 100000,
    accruedInvestments: 50000,
  },
  {
    id: '8',
    name: '2024 Thomas',
    status: 'Active',
    initials: '20',
    type: 'Private Equity',
    country: 'USA',
    currency: 'USD',
    daysSinceContribution: 30,
    stakeholders: 8,
    paymentAccounts: 2,
    capitalBalance: 750000,
    contributions: 800000,
    distributions: 50000,
    accruedInvestments: 75000,
  },
  {
    id: '9',
    name: 'AAA Project',
    status: 'Active',
    initials: 'AA',
    type: 'Venture Capital',
    country: 'USA',
    currency: 'USD',
    daysSinceContribution: 60,
    stakeholders: 15,
    paymentAccounts: 4,
    capitalBalance: 1200000,
    contributions: 1500000,
    distributions: 300000,
    accruedInvestments: 100000,
  },
  {
    id: '10',
    name: 'ABC Test',
    status: 'Active',
    initials: 'AB',
    type: 'Real Estate',
    country: 'Canada',
    currency: 'CAD',
    daysSinceContribution: 90,
    stakeholders: 20,
    paymentAccounts: 5,
    capitalBalance: 2000000,
    contributions: 2500000,
    distributions: 500000,
    accruedInvestments: 150000,
  },
  {
    id: '11',
    name: 'Sunset Plaza',
    status: 'Active',
    initials: 'SP',
    type: 'Commercial',
    country: 'USA',
    currency: 'USD',
    daysSinceContribution: 120,
    stakeholders: 25,
    paymentAccounts: 6,
    capitalBalance: 3500000,
    contributions: 4000000,
    distributions: 500000,
    accruedInvestments: 200000,
  },
  {
    id: '12',
    name: 'Downtown Center',
    status: 'Active',
    initials: 'DC',
    type: 'Mixed-Use',
    country: 'USA',
    currency: 'USD',
    daysSinceContribution: 75,
    stakeholders: 18,
    paymentAccounts: 4,
    capitalBalance: 2800000,
    contributions: 3200000,
    distributions: 400000,
    accruedInvestments: 180000,
  },
];

export default function ProjectsList() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(true);
  const [viewMode, setViewMode] = useState<'gallery' | 'grid'>('gallery');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Search */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>
          </div>

          {/* Center - Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="active-only"
              checked={showOnlyActive}
              onCheckedChange={setShowOnlyActive}
            />
            <Label htmlFor="active-only" className="text-sm text-gray-700 cursor-pointer">
              Show only active
            </Label>
          </div>

          {/* Right side - View buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'gallery' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('gallery')}
              className={viewMode === 'gallery' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : ''}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : ''}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-[#95D7E1] hover:bg-[#78C3D2] ml-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              NEW PROJECT
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {viewMode === 'gallery' ? (
          <>
            {/* Favorites Section - Gallery View */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Favorites</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFavoriteProjects
                  .filter((project) => !showOnlyActive || project.status === 'Active')
                  .filter((project) =>
                    project.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((project) => (
                    <Link key={project.id} href={`/projectdetail/${project.id}`}>
                      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Project thumbnail */}
                            <div className="w-12 h-12 bg-gradient-to-br from-[#95D7E1] to-[#78C3D2] rounded flex-shrink-0" />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h3 className="font-medium text-gray-900 truncate">
                                  {project.name}
                                </h3>
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{project.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* All Projects Section - Gallery View */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockAllProjects
                  .filter((project) => !showOnlyActive || project.status === 'Active')
                  .filter((project) =>
                    project.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((project) => (
                    <Link key={project.id} href={`/projectdetail/${project.id}`}>
                      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center gap-3">
                            {/* Project initials box */}
                            <div className="w-14 h-14 bg-[#F0F9FA] rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold text-[#95D7E1]">
                                {project.initials}
                              </span>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">
                                {project.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">{project.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Table/Grid View */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 capitalize">Name</th>
                      <th scope="col" className="px-6 py-3 capitalize">Stage</th>
                      <th scope="col" className="px-6 py-3 capitalize">Country</th>
                      <th scope="col" className="px-6 py-3 capitalize">Currency</th>
                      <th scope="col" className="px-6 py-3 capitalize">Days Since Contribution</th>
                      <th scope="col" className="px-6 py-3 capitalize">Stakeholders</th>
                      <th scope="col" className="px-6 py-3 capitalize">Payment Accounts</th>
                      <th scope="col" className="px-6 py-3 capitalize">Capital Balance</th>
                      <th scope="col" className="px-6 py-3 capitalize">Contributions</th>
                      <th scope="col" className="px-6 py-3 capitalize">Distributions</th>
                      <th scope="col" className="px-6 py-3 capitalize">Accrued Investments</th>
                    </tr>
                    {/* Search row */}
                    <tr className="bg-white">
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search name"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search stage"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search country"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search currency"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search days"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search balance"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...mockFavoriteProjects, ...mockAllProjects]
                      .filter((project) => !showOnlyActive || project.status === 'Active')
                      .filter((project) =>
                        project.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((project) => (
                        <tr
                          key={project.id}
                          className="border-t-2 border-b-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => (window.location.href = `/projectdetail/${project.id}`)}
                        >
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            <Link href={`/projectdetail/${project.id}`}>{project.name}</Link>
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">{project.status}</td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            {'country' in project ? project.country : 'USA'}
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            {'currency' in project ? project.currency : 'USD'}
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            {'daysSinceContribution' in project ? project.daysSinceContribution : '-'}
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            {'stakeholders' in project ? project.stakeholders : '-'}
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            {'paymentAccounts' in project ? project.paymentAccounts : '-'}
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            <span>$</span>
                            {'capitalBalance' in project ? project.capitalBalance.toLocaleString() : '-'}
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            <span>$</span>
                            {'contributions' in project ? project.contributions.toLocaleString() : '-'}
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            <span>$</span>
                            {'distributions' in project ? project.distributions.toLocaleString() : '-'}
                          </td>
                          <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                            <span>$</span>
                            {'accruedInvestments' in project ? project.accruedInvestments.toLocaleString() : '-'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}

