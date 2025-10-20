import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

const projectTypes = [
  'Real Estate',
  'Private Equity',
  'Venture Capital',
  'Debt Fund',
  'Hedge Fund',
  'Other',
];

const assetClassOptions = [
  'Residential',
  'Commercial',
  'Industrial',
  'Mixed-Use',
  'Land',
  'Retail',
  'Office',
  'Multifamily',
];

const regulationOptions = [
  'Regulation D - 506(b)',
  'Regulation D - 506(c)',
  'Regulation A+',
  'Regulation CF',
  'Regulation S',
  'None',
];

const structureOptions = [
  'LLC',
  'LP',
  'Corporation',
  'Trust',
  'Partnership',
  'Other',
];

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
];

const precisionOptions = ['0', '2', '4', '6', '8'];

export default function CreateProjectDialog({
  open,
  onOpenChange,
}: CreateProjectDialogProps) {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: '',
    projectType: '',
    legalName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    assetClasses: [],
    regulations: [],
    structure: '',
    currency: 'USD',
    unitCalculationPrecision: '2',
  });

  const updateFormData = (field: keyof ProjectFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'assetClasses' | 'regulations', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.projectName || !formData.projectType) {
          toast({
            title: 'Required Fields',
            description: 'Please fill in Project Name and Project Type',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
          toast({
            title: 'Required Fields',
            description: 'Please fill in all address fields',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      case 3:
        if (formData.assetClasses.length === 0 || !formData.structure) {
          toast({
            title: 'Required Fields',
            description: 'Please select at least one asset class and structure',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Project Created:', formData);
    toast({
      title: 'Success!',
      description: 'Your project has been created successfully.',
    });
    onOpenChange(false);
    // Reset form
    setFormData({
      projectName: '',
      projectType: '',
      legalName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      assetClasses: [],
      regulations: [],
      structure: '',
      currency: 'USD',
      unitCalculationPrecision: '2',
    });
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName" className="text-sm font-medium">
                Project Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="projectName"
                placeholder="Enter project name"
                value={formData.projectName}
                onChange={(e) => updateFormData('projectName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType" className="text-sm font-medium">
                Project Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => updateFormData('projectType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="legalName" className="text-sm font-medium">
                Legal Name <span className="text-gray-400">(Optional)</span>
              </Label>
              <Input
                id="legalName"
                placeholder="Enter legal name"
                value={formData.legalName}
                onChange={(e) => updateFormData('legalName', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                placeholder="Enter street address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="state"
                  placeholder="CA, TX, NY"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value.toUpperCase())}
                  maxLength={2}
                />
                <p className="text-xs text-gray-500">Use 2-letter abbreviation (e.g., CA, TX, NY)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-sm font-medium">
                  Zip Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zipCode"
                  placeholder="Enter zip code"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  Country
                </Label>
                <Input
                  id="country"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Asset Class(es) <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2 p-4 border rounded-md max-h-48 overflow-y-auto">
                {assetClassOptions.map((assetClass) => (
                  <label
                    key={assetClass}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={formData.assetClasses.includes(assetClass)}
                      onChange={() => toggleArrayItem('assetClasses', assetClass)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{assetClass}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Relevant Regulation(s)</Label>
              <div className="grid grid-cols-1 gap-2 p-4 border rounded-md max-h-48 overflow-y-auto">
                {regulationOptions.map((regulation) => (
                  <label
                    key={regulation}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={formData.regulations.includes(regulation)}
                      onChange={() => toggleArrayItem('regulations', regulation)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{regulation}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="structure" className="text-sm font-medium">
                Structure <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.structure}
                onValueChange={(value) => updateFormData('structure', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select structure" />
                </SelectTrigger>
                <SelectContent>
                  {structureOptions.map((structure) => (
                    <SelectItem key={structure} value={structure}>
                      {structure}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-medium">
                Currency <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => updateFormData('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="precision" className="text-sm font-medium">
                Unit Calculation Precision <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.unitCalculationPrecision}
                onValueChange={(value) => updateFormData('unitCalculationPrecision', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select precision" />
                </SelectTrigger>
                <SelectContent>
                  {precisionOptions.map((precision) => (
                    <SelectItem key={precision} value={precision}>
                      {precision} decimal places
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="font-medium text-green-800 mb-2 flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Ready to Create!
              </h3>
              <p className="text-sm text-green-700">
                You've completed all the required information. Click "Create Project" to finish.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Project
          </DialogTitle>
          <div className="flex items-center justify-between pt-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-[#95D7E1] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > stepNumber ? 'bg-[#95D7E1]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="pt-2 text-sm text-gray-600">
            Step {step} of 4: {' '}
            {step === 1 && 'Basic Information'}
            {step === 2 && 'Physical Address'}
            {step === 3 && 'Asset Details'}
            {step === 4 && 'Financial Settings'}
          </div>
        </DialogHeader>

        <div className="py-6">{renderStepContent()}</div>

        <div className="flex justify-between pt-4 border-t">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              onClick={handleNext}
              className="flex items-center bg-[#95D7E1] hover:bg-[#78C3D2]"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex items-center bg-[#95D7E1] hover:bg-[#78C3D2]"
            >
              <Check className="w-4 h-4 mr-1" />
              Create Project
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

