import React, { useState } from "react";
import { useLocation } from "wouter";

const CapitalRaisesStep6: React.FC = () => {
  const [, setLocation] = useLocation();
  const [selectedOption, setSelectedOption] = useState<
    "immediately" | "progressively"
  >("progressively");

  const steps = ["Capital Raise", "Project", "Details", "Settings", "Review"];
  const currentStep = 3; 

  const handleBack = () => {
    setLocation("/capitalraises/step5");
  };

  const handleNext = () => {
    setLocation("/capitalraises/step7"); 
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
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            When is capital due for new commitments?
          </h2>

          <div className="space-y-6">
            {/* Immediately Option */}
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedOption === "immediately"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedOption("immediately")}
            >
              <div className="flex items-start space-x-4">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="radio"
                    checked={selectedOption === "immediately"}
                    onChange={() => setSelectedOption("immediately")}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Immediately</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Investors will be prompted to fund 100% of their commitment
                    during the commitment process.
                  </p>
                </div>
              </div>
            </div>

            {/* Progressively with Capital Calls Option */}
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedOption === "progressively"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedOption("progressively")}
            >
              <div className="flex items-start space-x-4">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="radio"
                    checked={selectedOption === "progressively"}
                    onChange={() => setSelectedOption("progressively")}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    Progressively with Capital Calls
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Capital calls will only require investors to fund a
                    percentage (decided by the sponsor) of their commitment
                    during the commitment process. The rest can be called later.
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
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CapitalRaisesStep6;
