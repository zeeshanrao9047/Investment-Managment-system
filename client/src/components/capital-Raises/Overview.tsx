import React, { FC } from "react";
import { FaToggleOn } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAlarm } from "react-icons/cg";
import { FaCircleCheck } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const Overview: FC = () => {
  return (
    <div>
      {/* Back to Capital Raises & Go To Project */}
      <div className="flex justify-between mb-6 gap-2 pr-10 flex-wrap">
        <div className="flex gap-2 items-center flex-wrap">
          <button className="text-blue-500 border py-2 px-2 rounded-lg font-medium flex items-center gap-2">
            <IoReturnDownBack /> Back To Capital Raises
          </button>
          <button className="text-blue-500 border py-2 px-2 rounded-lg font-medium flex items-center gap-2">
            <HiOutlineBuildingOffice2 /> Go To Project
          </button>
        </div>
        <button className="text-white bg-blue-500 py-2 px-3 rounded-lg flex items-center gap-2">
          <FaToggleOn /> Set Status
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overscroll-auto gap-4 mb-8">
        <div className="bg-white p-5 border border-gray-300 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500 mb-1">TOTAL FUNDS RECEIVED</p>
          <p className="text-md sm:text-2xl font-semibold">$ 0.00</p>
        </div>
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500 mb-1">TOTAL PIPELINE VALUE</p>
          <p className="text-md sm:text-2xl font-semibold">$ 375,000.00</p>
        </div>
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500 mb-1">TARGET AMOUNT</p>
          <p className="text-md sm:text-2xl font-semibold">$ 500,000.00</p>
        </div>
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500 mb-1">TOTAL OPPORTUNITIES</p>
          <p className="text-md sm:text-2xl font-semibold">6</p>
        </div>
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500 mb-1">TOTAL COMMITMENTS</p>
          <p className="text-md sm:text-2xl font-semibold">6</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-1">
        {/* Opportunities Section */}
        <div className="bg-white rounded border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center flex-wrap mb-4">
            <h2 className="text-lg font-semibold">OPPORTUNITIES</h2>
            <button className="text-blue-600 underline text-md font-light">
              See Pipeline
            </button>
          </div>

          {/* Opportunity Items */}
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border border-gray-300 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <span className="font-medium">$25,000.00</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  {item === 1 ? "Waitlist Request" : "Eve Carter Opportunity"}
                </p>
                <p className="text-xs text-gray-500">Mar 15, 2024</p>
              </div>
            ))}
          </div>
          <button className="w-full border border-blue-500 text-blue-500 mt-2 py-2 rounded-lg">
            + Add New
          </button>
        </div>

        {/* Action Items Section */}
        <div className="bg-white border border-gray-200 rounded shadow-sm py-6 px-2">
          <h2 className="text-lg font-semibold mb-4">ACTION ITEMS</h2>

          {/* Action Items */}
          <div className="space-y-4 flex flex-col">
            {/* First Action Item */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between flex-wrap items-start mb-2">
                <span className="font-medium text-sm">
                  Task created by Alan Turing - Assigned to Alan Turing
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center gap-1">
                    <CgAlarm /> Due on Dec 31 2023
                  </span>
                  <RiDeleteBin6Line className="text-blue-500" />
                  <CiCircleCheck className="text-blue-500" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Dec 27 2023 07:22 PM
              </p>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur. Viverra id est vel ut
                nulla fermentum sapien. Potenti.
              </p>
            </div>

            {/* Second Action Item */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between flex-wrap items-start mb-2">
                <span className="font-medium text-sm">
                  Task created by Alan Turing - Assigned to Alan Turing
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                    <FaCircleCheck /> Complete
                  </span>
                  <RiDeleteBin6Line className="text-blue-500" />
                  <FaCircleCheck className="text-green-800" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Dec 27 2023 07:22 PM
              </p>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur. Viverra id est vel ut
                nulla fermentum sapien. Potenti.
              </p>
            </div>

            {/* Add New Button */}
            <div className="flex items-end">
              <button className="w-full py-2 border text-blue-500 border-blue-500 rounded-lg">
                + Add New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
