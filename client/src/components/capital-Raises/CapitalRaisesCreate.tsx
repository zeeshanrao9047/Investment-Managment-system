import React, { FC, useState, useRef, ChangeEvent } from "react";
import { Link, useLocation } from "wouter";

import Overview from "./Overview";
import DealRoom from "./DealRoom";


import { FaToggleOn, FaCircleCheck, FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAlarm } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { IoReturnDownBack } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

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
    <>
      
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="sm:text-2xl text-md font-bold text-gray-800">
            Orchard Hills 521 Apartments
          </h1>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-4 mb-6 py-2 border-b border-t border-gray-200 flex-wrap">
          {["Overview", "opportunities", "commitments", "dealRoom", "settings"].map((tab) => (
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
          ))}
        </div>

        {/* Tabs Content */}
        {activeTab === "Overview" && <Overview />}

        {activeTab === "dealRoom" && (
          <DealRoom
            dealRoomData={dealRoomData}
            tempDescription={tempDescription}
            setTempDescription={setTempDescription}
            handleSaveChanges={handleSaveChanges}
            handleShowcaseImageUpload={handleShowcaseImageUpload}
            handlePhotosUpload={handlePhotosUpload}
            handleNewGalleryUpload={handleNewGalleryUpload}
            removePhoto={removePhoto}
            removeGalleryImage={removeGalleryImage}
            fileInputRef={fileInputRef}
            photosInputRef={photosInputRef}
            newGalleryInputRef={newGalleryInputRef}
            setLocation={setLocation}
          />
        )}

   
      </div>
    
    </>
  );
};

export default CapitalRaisesCreate;
