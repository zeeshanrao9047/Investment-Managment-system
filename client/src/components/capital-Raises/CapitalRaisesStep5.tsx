import React, { useState } from "react";
import { useLocation } from "wouter";

const CapitalRaisesStep5: React.FC = () => {
  const [, setLocation] = useLocation();

  const [goals, setGoals] = useState({
    targetAmount: "5,000,000.00",
    targetClosingDate: "12/31/2023",
  });

  const steps = ["Capital Raise", "Project", "Details", "Settings", "Review"];
  const currentStep = 3; // Step 5 (Review step)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const formattedValue = value
      ? new Intl.NumberFormat("en-US").format(parseFloat(value))
      : "";
    setGoals((prev) => ({
      ...prev,
      targetAmount: formattedValue,
    }));
  };

  const formatDateForInput = (dateString: string) => {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
    }
    return dateString;
  };

  const parseDateFromInput = (dateString: string) => {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
    return dateString;
  };

  const handleBack = () => {
     setLocation("/capitalraises/step4");
  };

  const handleNext = () => {
     setLocation("/capitalraises/step6");
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Capital Raise</h1>
        <div className="w-full h-px bg-gray-300 mb-6"></div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What are your goals for this raise?
          </h2>

          <div className="space-y-6">
            {/* Target Amount Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target amount
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  value={goals.targetAmount}
                  onChange={handleAmountChange}
                  className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Target Closing Date Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target closing date
              </label>
              <input
                type="date"
                value={formatDateForInput(goals.targetClosingDate)}
                onChange={(e) => {
                  const formattedDate = parseDateFromInput(e.target.value);
                  setGoals((prev) => ({
                    ...prev,
                    targetClosingDate: formattedDate,
                  }));
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Display: {goals.targetClosingDate}
              </p>
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

export default CapitalRaisesStep5;
