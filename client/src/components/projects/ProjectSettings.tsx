import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface ProjectSettingsProps {
  projectId?: string;
}

export default function ProjectSettings({ projectId }: ProjectSettingsProps) {
  const { toast } = useToast();

  // Mock initial data - replace with API call
  const [formData, setFormData] = useState({
    projectName: 'Demo Project',
    legalName: 'Legal Demo Project',
    assetClasses: ['Multifamily'],
    regulations: ['Reg D: 506B'],
    structure: 'Syndication',
    projectType: 'LLC',
    address: '123 Apple Street',
    address2: '',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'United States',
  });

  const removeTag = (field: 'assetClasses' | 'regulations', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== value)
    }));
  };

  const addAssetClass = (value: string) => {
    if (value && !formData.assetClasses.includes(value)) {
      setFormData(prev => ({
        ...prev,
        assetClasses: [...prev.assetClasses, value]
      }));
    }
  };

  const addRegulation = (value: string) => {
    if (value && !formData.regulations.includes(value)) {
      setFormData(prev => ({
        ...prev,
        regulations: [...prev.regulations, value]
      }));
    }
  };

  const assetClassOptions = [
    'Residential',
    'Commercial',
    'Industrial',
    'Mixed-Use',
    'Land',
    'Retail',
    'Office',
    'Multifamily',
    'Hospitality',
    'Healthcare',
  ];

  const regulationOptions = [
    'Reg D: 506B',
    'Reg D: 506C',
    'Regulation A+',
    'Regulation CF',
    'Regulation S',
    'None',
  ];

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your project settings have been updated successfully.',
    });
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-semibold">Project Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <h3 className="text-base font-semibold text-gray-700">Basic Information</h3>
          
          {/* Name */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <Label htmlFor="name" className="text-right pt-2 text-sm text-gray-700">
              Name <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-2">
              <Input
                id="name"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="max-w-md"
              />
            </div>
          </div>

          {/* Legal Name */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <Label htmlFor="legalName" className="text-right pt-2 text-sm text-gray-700">
              Legal Name
            </Label>
            <div className="col-span-2">
              <Input
                id="legalName"
                value={formData.legalName}
                onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                className="max-w-md"
              />
            </div>
          </div>

          {/* Asset Class(es) */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <Label htmlFor="assetClasses" className="text-right pt-2 text-sm text-gray-700">
              Asset Class(es)
            </Label>
            <div className="col-span-2 space-y-2">
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px] max-w-md bg-white">
                {formData.assetClasses.map((asset, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 text-white rounded text-sm"
                  >
                    {asset}
                    <button
                      type="button"
                      onClick={() => removeTag('assetClasses', asset)}
                      className="hover:bg-gray-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Select onValueChange={(value) => addAssetClass(value)}>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Add asset class..." />
                </SelectTrigger>
                <SelectContent>
                  {assetClassOptions
                    .filter(option => !formData.assetClasses.includes(option))
                    .map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Relevant Regulation(s) */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <Label htmlFor="regulations" className="text-right pt-2 text-sm text-gray-700">
              Relevant Regulation(s)
            </Label>
            <div className="col-span-2 space-y-2">
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px] max-w-md bg-white">
                {formData.regulations.map((reg, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 text-white rounded text-sm"
                  >
                    {reg}
                    <button
                      type="button"
                      onClick={() => removeTag('regulations', reg)}
                      className="hover:bg-gray-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Select onValueChange={(value) => addRegulation(value)}>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Add regulation..." />
                </SelectTrigger>
                <SelectContent>
                  {regulationOptions
                    .filter(option => !formData.regulations.includes(option))
                    .map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Structure */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <Label htmlFor="structure" className="text-right pt-2 text-sm text-gray-700">
              Structure <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-2">
              <Select
                value={formData.structure}
                onValueChange={(value) => setFormData({ ...formData, structure: value })}
              >
                <SelectTrigger className="max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Syndication">Syndication</SelectItem>
                  <SelectItem value="Fund">Fund</SelectItem>
                  <SelectItem value="Joint Venture">Joint Venture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Type */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <Label htmlFor="projectType" className="text-right pt-2 text-sm text-gray-700">
              Project Type <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-2">
              <Select
                value={formData.projectType}
                onValueChange={(value) => setFormData({ ...formData, projectType: value })}
              >
                <SelectTrigger className="max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LLC">LLC</SelectItem>
                  <SelectItem value="LP">LP</SelectItem>
                  <SelectItem value="Corporation">Corporation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <Label htmlFor="address" className="text-right pt-2 text-sm text-gray-700">
              Address <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-2">
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="max-w-md"
              />
            </div>
          </div>

          {/* Address 2 */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <Label htmlFor="address2" className="text-right pt-2 text-sm text-gray-700">
              Address 2
            </Label>
            <div className="col-span-2">
              <Input
                id="address2"
                value={formData.address2}
                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                className="max-w-md"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div></div>
            <div className="col-span-2">
              <Button
                onClick={handleSave}
                className="bg-[#95D7E1] hover:bg-[#78C3D2]"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

