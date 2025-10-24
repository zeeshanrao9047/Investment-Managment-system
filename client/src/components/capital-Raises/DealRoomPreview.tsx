import React from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useLocation } from "wouter";
import image from "../layout/assets/login.avif";

const DealRoomPreview: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:px-15 px-3">
      {/* Back to Offerings */}
      <div className="mb-6">
        <button
          className="font-medium py-2 cursor-pointer px-2 border hover:text-blue-700 flex items-center gap-2 rounded"
          onClick={() =>  setLocation("/capitalraises/CapitalRaisesCreate")}
        >
          <IoReturnDownBack /> Back to Offerings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr]">
        <div className="sm:px-4 space-y-4">
          <img src={image} className="w-full sm:h-100 rounded" alt="Preview" />
          <div>
            <h1 className="text-2xl font-semibold">Capital Raise Name</h1>
            <p className="text-gray-600">Project name</p>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Key Information
            </h2>

            <div className="space-y-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Targeted Investor IRR</p>
                <p className="text-2xl font-bold text-gray-800">16%</p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Average Cash Yield</p>
                <p className="text-2xl font-bold text-gray-800">5.5%</p>
              </div>

              <button className="bg-black text-white w-full py-2 rounded">
                Invest Now
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-light text-gray-600 mb-1">
                Minimum Investor Commitment
              </p>
              <p className="font-medium text-gray-800">$200,000.00</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-light text-gray-600 mb-1">
                Project Overall Investor Return Per Annum
              </p>
              <p className="font-medium text-gray-800">$200,000.00</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-light text-gray-600 mb-1">
                Project Timeline
              </p>
              <p className="font-medium text-gray-800">$200,000.00</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-light text-gray-600 mb-1">
                Minimum Commitment
              </p>
              <p className="font-medium text-gray-800">$200,000.00</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2">
              <p className="text-xs font-light text-gray-600 mb-1">
                Project Address
              </p>
              <p className="font-medium text-gray-800">
                625 & 635 7th Avenue South, Nashville, TN
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2">
              <p className="text-xs font-light text-gray-600 mb-1">
                Investment Time Frame
              </p>
              <p className="font-medium text-gray-800">$200,000.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealRoomPreview;
