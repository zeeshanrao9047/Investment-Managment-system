import React, { FC, useState, useRef, ChangeEvent } from "react";
import { useLocation } from "wouter";

import { FaToggleOn, FaCircleCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAlarm } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { IoReturnDownBack } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

// ✅ Import layout components
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { RxCross1 } from "react-icons/rx";
// ✅ Import DealRoom component
import DealRoom from "./DealRoom";
import Opportunities from "./Opportunities";

interface ImageData {
  id: string;
  url: string;
  name: string;
}

interface DealRoomState {
  showcaseImage: string | null;
  photos: ImageData[];
  newGallery: ImageData[];
  description: string;
}

const CapitalRaisesCreate: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [, setLocation] = useLocation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photosInputRef = useRef<HTMLInputElement | null>(null);
  const newGalleryInputRef = useRef<HTMLInputElement | null>(null);
const [status, setStatus] = useState(false)
const [selectedStatus, setSelectedStatus] = useState('Draft')
const statusOptions = [
    {
      value: 'Draft',
      title: 'Draft',
      description: 'Capital raise will not be visible on the portal'
    },
    {
      value: 'Upcoming',
      title: 'Upcoming',
      description: 'Collecting soft commitments (no paperwork) and visible on the investor portal'
    },
    {
      value: 'Active',
      title: 'Active',
      description: 'Actively collecting commitments and visible on the investor portal'
    },
    {
      value: 'Closed',
      title: 'Closed',
      description: 'Not collecting any new commitments'
    }
  ]


const handleStatusSelect = (optionValue) => {
    setSelectedStatus(optionValue)
  }
 
  const handleUpdateStatus = () => {
    // Here you would typically make an API call to update the status
   
    setStatus(false)
  }


  const [dealRoomData, setDealRoomData] = useState<DealRoomState>({
    showcaseImage: null,
    photos: [],
    newGallery: [],
    description:
      "Nashville, known worldwide as the Music City, is currently hitting all the right investment notes. The city's real estate market is harmonizing with robust growth, offering prime opportunities for investors.",
  });

  const [tempDescription, setTempDescription] = useState<string>(
    dealRoomData.description
  );

  // 📤 Upload Handlers
  const handleShowcaseImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setDealRoomData((prev) => ({
        ...prev,
        showcaseImage: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handlePhotosUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPhotos: ImageData[] = [];
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPhotos.push({
          id: `photo-${Date.now()}-${index}`,
          url: e.target?.result as string,
          name: file.name,
        });
        if (newPhotos.length === files.length) {
          setDealRoomData((prev) => ({
            ...prev,
            photos: [...prev.photos, ...newPhotos],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleNewGalleryUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newGalleryImages: ImageData[] = [];
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newGalleryImages.push({
          id: `gallery-${Date.now()}-${index}`,
          url: e.target?.result as string,
          name: file.name,
        });
        if (newGalleryImages.length === files.length) {
          setDealRoomData((prev) => ({
            ...prev,
            newGallery: [...prev.newGallery, ...newGalleryImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // ❌ Remove Handlers
  const removePhoto = (id: string) => {
    setDealRoomData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id),
    }));
  };

  const removeGalleryImage = (id: string) => {
    setDealRoomData((prev) => ({
      ...prev,
      newGallery: prev.newGallery.filter((img) => img.id !== id),
    }));
  };

  // 💾 Save Changes
  const handleSaveChanges = () => {
    setDealRoomData((prev) => ({
      ...prev,
      description: tempDescription,
    }));
    alert("Changes saved successfully!");
  };

  return (
    <div className="block md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="w-full flex flex-col min-h-screen">
        {/* Header */}
        <Header value="Capital Raises Create" />

        {/* Body */}
        <main className="flex-1 bg-gray-50 p-6 mt-[65px] lg:mt-0 transition-all duration-300">
          {/* Tabs Navigation */}
          <div className="flex space-x-4 mb-6 py-2 border-b border-t border-gray-200 flex-wrap">
            {["Overview", "opportunities", "commitments", "dealRoom", "settings"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-1 font-medium cursor-pointer ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>

          {/* --- Overview Tab Content --- */}
          {activeTab === "Overview" && (
            <>
              <div className="flex justify-between mb-6 gap-2 pr-10 flex-wrap">
                <div className="flex gap-2 items-center flex-wrap">
                  <button className="text-blue-500 border py-2 px-2 rounded-lg font-medium flex items-center gap-2">
                    <IoReturnDownBack /> Back To Capital Raises
                  </button>
                  <button className="text-blue-500 border py-2 px-2 rounded-lg font-medium flex items-center gap-2">
                    <HiOutlineBuildingOffice2 /> Go To Project
                  </button>
                </div>
                <button className="text-white bg-blue-500 py-2 px-3 rounded-lg flex items-center gap-2" onClick={() => setStatus(true)}>
                  <FaToggleOn /> Set Status
                </button>
{status && (
        <div className="fixed inset-0 top-[-40px] bg-[#0000006f] flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg text-black">
            <div className="flex items-center justify-between px-8 py-2 border-b border-b-gray-400">
              <p className="text-lg text-gray-700 font-light">
                Edit Capital Raise Status
              </p>
              <RxCross1
                className="text-gray-400 cursor-pointer text-xl"
                onClick={() => setStatus(false)}
              />
            </div>
           
            <div className="flex flex-col gap-4 px-5 py-2">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  className={`radio-option flex rounded-lg items-center gap-3 p-4 bg-gray-50 cursor-pointer border transition-all duration-200 hover:border-gray-300 ${
                    selectedStatus === option.value
                      ? 'border-blue-500 text-blue-500 active'
                      : 'border-transparent'
                  }`}
                  onClick={() => handleStatusSelect(option.value)}
                >
                  <input
                    type="radio"
                    name="status"
                    className="w-4 h-4 cursor-pointer text-blue-500"
                    checked={selectedStatus === option.value}
                    onChange={() => handleStatusSelect(option.value)}
                  />
                  <div>
                    <h3 className={`font-medium ${
                      selectedStatus === option.value ? 'text-blue-500' : 'text-gray-900'
                    }`}>
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
           
            <div className="py-6 flex justify-end gap-5 px-8">
              <button
                className="border border-gray-400 text-gray-700 hover:bg-gray-100 cursor-pointer py-2 px-4 rounded-lg transition-colors"
                onClick={() => setStatus(false)}
              >
                Cancel
              </button>
              <button
                className="border border-blue-500 text-white bg-blue-500 cursor-pointer hover:bg-blue-600 py-2 px-4 rounded-lg transition-colors"
                onClick={handleUpdateStatus}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

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

                  <div className="space-y-4 flex flex-col">
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
                      <p className="text-xs text-gray-500 mb-2">Dec 27 2023 07:22 PM</p>
                      <p className="text-sm text-gray-700">
                        Lorem ipsum dolor sit amet consectetur. Viverra id est vel ut
                        nulla fermentum sapien. Potenti.
                      </p>
                    </div>

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
                      <p className="text-xs text-gray-500 mb-2">Dec 27 2023 07:22 PM</p>
                      <p className="text-sm text-gray-700">
                        Lorem ipsum dolor sit amet consectetur. Viverra id est vel ut
                        nulla fermentum sapien. Potenti.
                      </p>
                    </div>

                    <div className="flex items-end">
                      <button className="w-full py-2 border text-blue-500 border-blue-500 rounded-lg">
                        + Add New
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* --- Deal Room Tab --- */}
          {activeTab === "dealRoom" && (
            <div className="mt-4">
              <DealRoom />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          )}

          {/* --- Opportunities Tab --- */}
{activeTab === "opportunities" && (
  <div className="mt-4">
    <Opportunities />
  </div>
)}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default CapitalRaisesCreate;
