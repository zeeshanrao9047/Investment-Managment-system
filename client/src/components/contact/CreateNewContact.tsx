import React, { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import Sidebar from "@/components/layout/Sidebar";
const CreateNewContact: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        about: "",
        tags: [] as string[],
        company: "",
        title: "",
        email: "",
        enableEmailSync: true,
        unsubscribeMarketing: false,
        primaryPhone: "",
        cellPhone: "",
        workPhone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "United States of America"
    });

    const [newTag, setNewTag] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare form data with image
        const submitData = {
            ...formData,
            profileImage: imageFile
        };

        console.log("Form submitted:", submitData);
        // Handle form submission here
        // You can use FormData for actual file upload:
        // const formDataToSend = new FormData();
        // if (imageFile) {
        //   formDataToSend.append('profileImage', imageFile);
        // }
        // ... append other fields
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.currentTarget.id === 'tagInput') {
            e.preventDefault();
            handleAddTag();
        }
    };
    const heading = "Create New Contact";

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-full overflow-x-auto">
                    <Header value={heading} />
                    <Main>
                        <div className="p-1">
                            <div>
                                <div className="mb-4">
                                    <h1 className="text-lg font-bold text-gray-900">New Contact</h1>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Basic Information Section */}
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>

                                        <div className="space-y-6">
                                            {/* Profile Picture */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        {profileImage ? (
                                                            <div className="relative">
                                                                <img
                                                                    src={profileImage}
                                                                    alt="Profile"
                                                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={handleRemoveImage}
                                                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                                                                <span className="text-gray-500 text-sm">No Image</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col space-y-2">
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            onChange={handleImageUpload}
                                                            accept="image/*"
                                                            className="hidden"
                                                            id="profileImage"
                                                        />
                                                        <label
                                                            htmlFor="profileImage"
                                                            className="px-3 py-1 border border-gray-300 mt-0 rounded-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer text-center"
                                                        >
                                                            Upload Image
                                                        </label>
                                                        <span className="text-xs text-gray-500">
                                                            PNG, JPG up to 5MB
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* First Name & Last Name */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="Michael"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Birthday */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    value={formData.birthday}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                />
                                            </div>

                                            {/* About / Summary */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">About / Summary</label>
                                                <textarea
                                                    name="about"
                                                    value={formData.about}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    placeholder="Enter a brief description about this contact..."
                                                />
                                            </div>

                                            {/* Tags */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                                                <div className="flex flex-wrap gap-3 justify-center mb-3">
                                                    <input
                                                        id="tagInput"
                                                        type="text"
                                                        value={newTag}
                                                        onChange={(e) => setNewTag(e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                        placeholder="Add tag"
                                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddTag}
                                                        className="bg-[#95d7e1] text-white px-2 py-1 rounded-sm text-sm font-medium hover:bg-[#6fc8d6]"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                                        >
                                                            {tag}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveTag(tag)}
                                                                className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Information Section */}
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Company Information</h2>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    placeholder="Company name"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    placeholder="Job title"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information Section */}
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h2>

                                        <div className="space-y-6">
                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    placeholder="email@example.com"
                                                />
                                            </div>

                                            {/* Email Options */}
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="enableEmailSync"
                                                        checked={formData.enableEmailSync}
                                                        onChange={handleInputChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Enable email sync</span>
                                                </label>

                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="unsubscribeMarketing"
                                                        checked={formData.unsubscribeMarketing}
                                                        onChange={handleInputChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Unsubscribe from marketing emails</span>
                                                </label>
                                            </div>

                                            {/* Phone Numbers */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        name="primaryPhone"
                                                        value={formData.primaryPhone}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="(555) 123-4567"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cell Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        name="cellPhone"
                                                        value={formData.cellPhone}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="(555) 123-4567"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        name="workPhone"
                                                        value={formData.workPhone}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="(555) 123-4567"
                                                    />
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
                                                    <input
                                                        type="text"
                                                        name="address1"
                                                        value={formData.address1}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="Street address"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
                                                    <input
                                                        type="text"
                                                        name="address2"
                                                        value={formData.address2}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="Apartment, suite, etc."
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                            placeholder="City"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleInputChange}
                                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                            placeholder="State"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Zipcode</label>
                                                        <input
                                                            type="text"
                                                            name="zipcode"
                                                            value={formData.zipcode}
                                                            onChange={handleInputChange}
                                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                            placeholder="Zip code"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                                    <select
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    >
                                                        <option>United States of America</option>
                                                        <option>Canada</option>
                                                        <option>United Kingdom</option>
                                                        <option>Australia</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Create contact buttons */}
                                    <div className="flex justify-end space-x-4 pt-6">
                                        <button
                                            type="button"
                                            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-[#95d7e1] text-white px-5 py-2 rounded-sm text-sm font-medium hover:bg-[#6fc8d6]"
                                        >
                                            Create Contact
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Main>
                </div>
            </div>
        </>
    );
};

export default CreateNewContact;