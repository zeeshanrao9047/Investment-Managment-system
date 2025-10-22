import React from 'react';
import { useLocation } from "wouter";

const CapitalRaisesStep7: React.FC = () => {
  const steps = ['Capital Raise', 'Project', 'Details', 'Settings', 'Review'];
  const currentStep = 4; 
  const capitalRaiseDetails = {
    name: 'Capital Hill Calls',
    targetAmount: '$10,000,000.00',
    targetClosingDate: 'Dec 31 2024',
    classes: 'Class A',
    pipeline: 'Default Pipeline'
  };
 const [, setLocation] = useLocation();
  const handleBack = () => {
    setLocation("/capitalraises/step6");
  };

  const onCreate = () => {
    setLocation("/capitalraises/CapitalRaisesCreate"); 
  };

  return (
    <div className="flex justify-center item-center min-h-screen bg-gray-50">
    <div className="p-6 bg-white rounded-lg shadow-sm">
    
      <div className="flex items-center justify-between mb-8 max-w-3xl">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index === currentStep
                  ? 'bg-blue-600 text-white'
                  : index < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                index === currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 w-12 h-0.5 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

     
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Capital Raise</h1>
        <div className="w-full h-px bg-gray-300 mb-6"></div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Review your capital raise details.
          </h2>

          
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Capital Raise Name</span>
                <span className="text-sm font-semibold text-gray-900 text-right">
                  {capitalRaiseDetails.name}
                </span>
              </div>

              
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Target Amount</span>
                <span className="text-sm font-semibold text-gray-900 text-right">
                  {capitalRaiseDetails.targetAmount}
                </span>
              </div>

              
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Target Closing Date</span>
                <span className="text-sm font-semibold text-gray-900 text-right">
                  {capitalRaiseDetails.targetClosingDate}
                </span>
              </div>

              
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Classes</span>
                <span className="text-sm font-semibold text-gray-900 text-right">
                  {capitalRaiseDetails.classes}
                </span>
              </div>

              {/* Pipeline */}
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Pipeline</span>
                <span className="text-sm font-semibold text-gray-900 text-right">
                  {capitalRaiseDetails.pipeline}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Information Section (optional) */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Ready to create your capital raise
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Review all the details above. Once you click "Create Capital Raise", 
                    your capital raise will be created and you'll be able to start managing investments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button 
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          
          <button 
            onClick={onCreate}
            className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create Capital Raise</span>
          </button>
        </div>
      </div></div>
    </div>
  );
};

export default CapitalRaisesStep7;