import React, { useState } from 'react';
import { useRoute } from 'wouter';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ProjectSettings from '@/components/projects/ProjectSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Settings,
  FileText,
  DollarSign,
  ArrowDownRight,
  Plus,
  Download,
  Star,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const [, params] = useRoute('/projectdetail/:id');
  const projectId = params?.id;
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSettingsTab, setActiveSettingsTab] = useState('project-profile');
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock project data - replace with API call
  const project = {
    id: projectId || '1',
    name: 'Sunset Plaza Development',
    type: 'Real Estate',
    stage: 'Active',
    description: 'A luxury residential development in the heart of Los Angeles.',
    capitalBalance: 2500000,
    stakeholders: 45,
    daysActive: 180,
    currency: 'USD',
    contributions: 3200000,
    distributions: 700000,
    accruedIncome: 125000,
  };

  const heading = project.name;

  return (
    <div className="block md:flex">
      <Sidebar />
      <div className="w-full overflow-x-auto">
        <Header 
          value={heading} 
          showFavorite={true}
          isFavorite={isFavorite}
          onFavoriteToggle={() => setIsFavorite(!isFavorite)}
        />
        <main className="max-w-full mt-[65px] lg:mt-0 transition-all duration-100 ease-in-out">
          {/* Tabbed Content - InvestNext Style */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-auto p-0 bg-white border-b space-x-0 rounded-none justify-start overflow-x-auto px-3 md:px-5">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="transactions" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Transactions
              </TabsTrigger>
              <TabsTrigger 
                value="positions" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Positions
              </TabsTrigger>
              <TabsTrigger 
                value="commitments" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Commitments
              </TabsTrigger>
              <TabsTrigger 
                value="capital-calls" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Capital Calls
              </TabsTrigger>
              <TabsTrigger 
                value="distributions" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Distributions
              </TabsTrigger>
              <TabsTrigger 
                value="classes" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Classes
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="assets" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Assets
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#95D7E1] data-[state=active]:text-[#3b60e6] data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 font-medium"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-3 md:p-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Contributions</span>
                      <span className="font-bold">
                        {project.currency} {project.contributions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Distributions</span>
                      <span className="font-bold">
                        {project.currency} {project.distributions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Net Capital</span>
                      <span className="font-bold text-green-600">
                        {project.currency}{' '}
                        {(project.contributions - project.distributions).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                        <div>
                          <p className="font-medium">New investor added</p>
                          <p className="text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-[#95D7E1] mt-1.5" />
                        <div>
                          <p className="font-medium">Distribution processed</p>
                          <p className="text-gray-500">5 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5" />
                        <div>
                          <p className="font-medium">Document uploaded</p>
                          <p className="text-gray-500">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="p-3 md:p-5">
              <Card>
                <CardHeader>
                  <CardTitle>Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Transaction history will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="positions" className="p-3 md:p-5">
              <Card>
                <CardHeader>
                  <CardTitle>Investor Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Investor positions and ownership will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commitments" className="p-3 md:p-5">
              <Card>
                <CardHeader>
                  <CardTitle>Commitments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Investor commitments will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="capital-calls" className="p-3 md:p-5">
              <Card>
                <CardHeader>
                  <CardTitle>Capital Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Capital call management will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="distributions" className="p-3 md:p-5">
              <Card>
                <CardHeader>
                  <CardTitle>Distributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Distribution management will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classes" className="p-3 md:p-5">
              <Card>
                <CardHeader>
                  <CardTitle>Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Project classes and units will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="p-3 md:p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Documents</h3>
                  <Button className="bg-[#95D7E1] hover:bg-[#78C3D2] flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Upload Document
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Document Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-[#95D7E1]" />
                          <div>
                            <h4 className="font-medium">Operating Agreement</h4>
                            <p className="text-sm text-gray-500">PDF • 2.4 MB • Uploaded Jan 15, 2025</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-green-500" />
                          <div>
                            <h4 className="font-medium">PPM (Private Placement Memorandum)</h4>
                            <p className="text-sm text-gray-500">PDF • 5.8 MB • Uploaded Dec 1, 2024</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="p-3 md:p-5">
              <Card>
                <CardHeader>
                  <CardTitle>Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Project assets and properties will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="p-3 md:p-5">
              <div className="flex gap-6">
                {/* Settings Sub-Navigation */}
                <div className="w-64 flex-shrink-0">
                  <div className="bg-white rounded-lg border p-2 space-y-1">
                    <button
                      onClick={() => setActiveSettingsTab('project-profile')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSettingsTab === 'project-profile'
                          ? 'bg-[#95D7E1] text-[#3b60e6]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Project Profile
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('accounting')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSettingsTab === 'accounting'
                          ? 'bg-[#95D7E1] text-[#3b60e6]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <DollarSign className="w-4 h-4" />
                      Accounting Settings
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('payments')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSettingsTab === 'payments'
                          ? 'bg-[#95D7E1] text-[#3b60e6]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <DollarSign className="w-4 h-4" />
                      Payments
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('distribution-plans')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSettingsTab === 'distribution-plans'
                          ? 'bg-[#95D7E1] text-[#3b60e6]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ArrowDownRight className="w-4 h-4" />
                      Distribution Plans
                    </button>
                    <button
                      onClick={() => setActiveSettingsTab('access')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSettingsTab === 'access'
                          ? 'bg-[#95D7E1] text-[#3b60e6]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      Access
                    </button>
                  </div>
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                  {activeSettingsTab === 'project-profile' && (
                    <ProjectSettings projectId={projectId} />
                  )}
                  {activeSettingsTab === 'accounting' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Accounting Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">Accounting configuration will be displayed here.</p>
                      </CardContent>
                    </Card>
                  )}
                  {activeSettingsTab === 'payments' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">Payment methods and configuration will be displayed here.</p>
                      </CardContent>
                    </Card>
                  )}
                  {activeSettingsTab === 'distribution-plans' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribution Plans</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">Distribution plan configuration will be displayed here.</p>
                      </CardContent>
                    </Card>
                  )}
                  {activeSettingsTab === 'access' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Access Control</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">User permissions and access control will be displayed here.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
