import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "wouter";
const CapitalRaisesStep3: React.FC = () => {


  const [formData, setFormData] = useState({
    projectName: "Capital Call Project LLC",
    projectType: "LLC",
    legalName: "Capital Call Project LLC",
  });

  const steps = ["Capital Raise", "Project", "Details", "Settings", "Review"];
  const currentStep = 1; // 'Project' step
 const [, setLocation] = useLocation();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // You can add validation or API call here if needed
     setLocation("/capitalraises/step4");
  };

  const handleBack = () => {
   setLocation("/capitalraises/step2");
  };

  return (
    <div className="flex justify-center item-center min-h-screen bg-gray-50">
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 max-w-3xl">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index === currentStep
                  ? "bg-blue-600 text-white"
                  : index < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                index === currentStep ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 w-12 h-0.5 ${
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Capital Raise</h1>
        <div className="w-full h-px bg-gray-300 mb-6"></div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What should we call this project?
          </h2>
          <p className="text-gray-600 mb-6">
            Please provide the basic project information.
          </p>

          <div className="space-y-6">
            {/* Project Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project name"
              />
            </div>

            {/* Project Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type *
              </label>
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project type"
              />
            </div>

            {/* Legal Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legal Name (Optional)
              </label>
              <input
                type="text"
                name="legalName"
                value={formData.legalName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter legal name"
              />
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

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Book</span>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CapitalRaisesStep3;
