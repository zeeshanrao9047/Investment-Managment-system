import React, { useState } from "react";
import { useLocation } from "wouter";

const CapitalRaisesStep4: React.FC = () => {
  const [settings, setSettings] = useState({
    currency: "USD",
    unitPrecision: "0",
  });

  const [, setLocation] = useLocation();
  const steps = ["Capital Raise", "Project", "Details", "Settings", "Review"];
  const currentStep = 2; // Step 4 (0-indexed)

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
  ];

  const precisionOptions = [
    { value: "0", label: "One Millionth" },
    { value: "1", label: "One Hundred Thousandth" },
    { value: "2", label: "Ten Thousandth" },
    { value: "3", label: "One Thousandth" },
    { value: "4", label: "One Hundredth" },
    { value: "5", label: "One Tenth" },
    { value: "6", label: "One Unit" },
  ];

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      currency: e.target.value,
    }));
  };

  const handlePrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      unitPrecision: e.target.value,
    }));
  };

  const getSelectedPrecisionLabel = () => {
    const selected = precisionOptions.find(
      (option) => option.value === settings.unitPrecision
    );
    return selected ? selected.label : "One Millionth";
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

        <div className="mb-8">
          <p className="text-gray-600 mb-6">
            Please edit any project settings before continuing.
          </p>

          <div className="space-y-6">
            {/* Currency Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <div className="relative">
                <select
                  value={settings.currency}
                  onChange={handleCurrencyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Unit Calculation Precision Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Calculation Precision
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <select
                      value={settings.unitPrecision}
                      onChange={handlePrecisionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {precisionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-gray-600 text-sm">
                    {getSelectedPrecisionLabel()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            onClick={() => setLocation("/capitalraises/step3")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">BOX</span>
            <button
              onClick={() => setLocation("/capitalraises/step5")}
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

export default CapitalRaisesStep4;
