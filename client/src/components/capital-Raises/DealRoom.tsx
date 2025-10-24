import React, { useState, useRef, ChangeEvent, FC } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import image from "../assets/login.avif";
import { useLocation } from "wouter";

// Define types for images
interface UploadedImage {
  id: string;
  url: string | ArrayBuffer | null;
  name: string;
}

// Define main state type
interface DealRoomData {
  showcaseImage: string | ArrayBuffer | null;
  photos: UploadedImage[];
  newGallery: UploadedImage[];
  description: string;
}

const DealRoom: FC = () => {
  const [, setLocation] = useLocation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photosInputRef = useRef<HTMLInputElement | null>(null);
  const newGalleryInputRef = useRef<HTMLInputElement | null>(null);

  const [dealRoomData, setDealRoomData] = useState<DealRoomData>({
    showcaseImage: null,
    photos: [],
    newGallery: [],
    description:
      "Nashville, known worldwide as the Music City, is currently hitting all the right investment notes. The city's real estate market is harmonizing with robust growth, offering prime opportunities for investors.",
  });

  const [tempDescription, setTempDescription] = useState<string>(
    dealRoomData.description
  );

  // Handle showcase image upload
  const handleShowcaseImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDealRoomData((prev) => ({
          ...prev,
          showcaseImage: e.target?.result || null,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle photos upload
  const handlePhotosUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos: UploadedImage[] = [];

      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPhotos.push({
            id: `photo-${Date.now()}-${index}`,
            url: e.target?.result || null,
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
    }
  };

  // Handle new gallery upload
  const handleNewGalleryUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newGalleryImages: UploadedImage[] = [];

      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newGalleryImages.push({
            id: `gallery-${Date.now()}-${index}`,
            url: e.target?.result || null,
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
    }
  };

  // Remove photo
  const removePhoto = (id: string) => {
    setDealRoomData((prev) => ({
      ...prev,
      photos: prev.photos.filter((photo) => photo.id !== id),
    }));
  };

  // Remove gallery image
  const removeGalleryImage = (id: string) => {
    setDealRoomData((prev) => ({
      ...prev,
      newGallery: prev.newGallery.filter((image) => image.id !== id),
    }));
  };

  // Save changes
  const handleSaveChanges = () => {
    setDealRoomData((prev) => ({
      ...prev,
      description: tempDescription,
    }));

    console.log("Saving deal room data:", {
      ...dealRoomData,
      description: tempDescription,
    });

    alert("Changes saved successfully!");
  };

  // Trigger uploads
  const triggerShowcaseImageUpload = () => fileInputRef.current?.click();
  const triggerPhotosUpload = () => photosInputRef.current?.click();
  const triggerNewGalleryUpload = () => newGalleryInputRef.current?.click();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between mb-6 flex-wrap gap-2 pr-10">
        <div className="flex items-center flex-wrap gap-2">
          <button className="text-blue-500 border py-2 px-2 rounded-lg font-medium flex items-center gap-2 cursor-pointer">
            <IoReturnDownBack /> Back To Capital Raises
          </button>
          <button className="text-blue-500 border py-2 px-2 rounded-lg font-medium flex items-center gap-2 cursor-pointer">
            <HiOutlineBuildingOffice2 /> Go To Project
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="text-blue-500 border border-blue-500 py-2 px-3 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => setLocation("/capitalraises/DealRoomPreview")}
          >
            <FaRegEye /> Preview
          </button>
          <button
            className="text-white bg-blue-500 py-2 px-3 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>

          {/* Hidden file inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleShowcaseImageUpload}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={photosInputRef}
            onChange={handlePhotosUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <input
            type="file"
            ref={newGalleryInputRef}
            onChange={handleNewGalleryUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </div>

      {/* Showcase Image Section */}
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Showcase Image
        </h2>
        <p className="text-sm text-gray-600">
          This image will be the main photo displayed on your new offering.
        </p>

        {dealRoomData.showcaseImage ? (
          <div className="relative w-full sm:w-72">
            <img
              src={dealRoomData.showcaseImage.toString()}
              className="mt-3 w-full h-full rounded object-cover"
              alt="Showcase"
            />
            <button
              onClick={() =>
                setDealRoomData((prev) => ({ ...prev, showcaseImage: null }))
              }
              className="absolute top-2 right-2 bg-red-500 text-white w-5 h-5 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center cursor-pointer"
            >
              ×
            </button>
          </div>
        ) : (
          <div
            className="w-35 h-35 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors mt-3"
            onClick={triggerShowcaseImageUpload}
          >
            <div className="text-5xl text-gray-400 font-light mb-2">+</div>
            <p className="text-gray-500 text-center">
              Click to upload showcase image
            </p>
          </div>
        )}

        {/* Photos Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Photos</h2>
            <button className="text-blue-500" onClick={triggerPhotosUpload}>
              + Add Photos
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Recommended image size: 1920x1080 pixels.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4 mt-4">
            {dealRoomData.photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url?.toString()}
                  className="w-full h-full object-cover rounded-lg"
                  alt={photo.name}
                />
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
            <div
              className="h-25 w-25 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={triggerPhotosUpload}
            >
              <div className="text-3xl text-gray-400 font-extralight">+</div>
            </div>
          </div>
        </div>

        {/* New Gallery Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">New Gallery</h2>
            <button className="text-blue-500" onClick={triggerNewGalleryUpload}>
              + Add Gallery
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4 mt-4">
            {dealRoomData.newGallery.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url?.toString()}
                  className="w-full h-full object-cover rounded-lg"
                  alt={image.name}
                />
                <button
                  onClick={() => removeGalleryImage(image.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
            <div
              className="h-25 w-25 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={triggerNewGalleryUpload}
            >
              <div className="text-3xl text-gray-400 font-extralight">+</div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6 mt-6">
          <h3 className="font-medium text-gray-700 mb-3">Description</h3>
          <p className="text-sm text-gray-600 mb-4">
            Write a few sentences describing the features that make this an
            attractive investment.
          </p>
          <textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter description here..."
          />
        </div>
      </div>
    </div>
  );
};

export default DealRoom;
