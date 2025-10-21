import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "wouter";
const CapitalRaisesStep2: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<"new" | "existing" | null>(null);
 const [, setLocation] = useLocation();

  const steps = ["Capital Raise", "Project", "Details", "Settings", "Review"];
  const currentStep = 0;

  const handleNext = () => {
    if (selectedOption) {
     
     setLocation("/capitalraises/step3");
    }
  };

  return (
     <div className="flex justify-center items-center min-h-screen bg-gray-50">
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          STEP 2. Decide whether you need to create a new Project for this Capital Raise OR if you'll be using a current/existing Project for this Capital Raise:
        </h2>

        <div className="space-y-4 mb-8">
          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedOption === "new"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedOption("new")}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selectedOption === "new"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === "new" && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Yes</h3>
                <p className="text-gray-600 text-sm mt-1">
                  We'll automatically create a new project for this capital raise.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedOption === "existing"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedOption("existing")}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selectedOption === "existing"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === "existing" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">No</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Raise funds for an existing project.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            selectedOption
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedOption}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default CapitalRaisesStep2;
