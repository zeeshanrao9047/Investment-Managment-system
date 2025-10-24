import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React, { useState } from "react";
import Main from "@/components/layout/Main";

const CreateNewAccount: React.FC = () => {
    const [formData, setFormData] = useState({
        primaryContact: "Microsoft Jordan",
        countryOfOrigin: "United States of America",
        legalAccountType: "Entity",
        entityType: "United Liability Company",
        disregardedEntity: "disregarded",
        accountName: "",
        taxIdentificationNumber: "",
        externalAccountReference: "",
        email: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "United States of America",
        careOf1: "",
        careOf2: "",
        defaultPaymentType: "Auto Payment"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'radio') {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Handle form submission here
    };

    const countries = [
        "United States of America",
        "Canada",
        "United Kingdom",
        "Australia",
        "Germany",
        "France",
        "Japan",
        "China",
        "India",
        "Brazil"
    ];

    const entityTypes = [
        "United Liability Company",
        "Corporation",
        "Partnership",
        "Sole Proprietorship",
        "Trust",
        "Estate"
    ];

    const paymentTypes = [
        "Auto Payment",
        "Manual Payment",
        "Wire Transfer",
        "ACH Transfer"
    ];

    const heading = "Create New Account";
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="w-full overflow-x-auto">
                    <Header value={heading} />
                    <Main>
                        <div className="p-1">
                            <div>
                                {/* Header */}
                                <div className="mb-4">
                                    <h1 className="text-lg font-semibold text-gray-900">New Account</h1>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Basic Information Section */}
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
                                            {/* Primary Contact */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Contact</label>
                                                <select
                                                    name="primaryContact"
                                                    value={formData.primaryContact}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option>Microsoft Jordan</option>
                                                    <option>Apple Inc.</option>
                                                    <option>Google LLC</option>
                                                    <option>Amazon Inc.</option>
                                                </select>
                                            </div>

                                            {/* Country of Origin */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin</label>
                                                <select
                                                    name="countryOfOrigin"
                                                    value={formData.countryOfOrigin}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    {countries.map((country) => (
                                                        <option key={country} value={country}>{country}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Legal Account Type */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Legal Account Type *
                                                </label>
                                                <select
                                                    name="legalAccountType"
                                                    value={formData.legalAccountType}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                >
                                                    <option value="Entity">Entity</option>
                                                    <option value="Individual">Individual</option>
                                                    <option value="Joint">Joint</option>
                                                    <option value="Trust">Trust</option>
                                                </select>
                                            </div>

                                            {/* Entity Type */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Entity Type *
                                                </label>
                                                <select
                                                    name="entityType"
                                                    value={formData.entityType}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                >
                                                    {entityTypes.map((type) => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="accountName"
                                                    value={formData.accountName}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    placeholder="Jumpman Jordan, LLC"
                                                    required
                                                />
                                            </div>

                                            {/* Tax Identification Number */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Tax Identification Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="taxIdentificationNumber"
                                                    value={formData.taxIdentificationNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    placeholder="Enter TIN"
                                                />
                                            </div>

                                            {/* External Account Reference */}
                                            <div className="col-span-full">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    External Account Reference
                                                </label>
                                                <input
                                                    type="text"
                                                    name="externalAccountReference"
                                                    value={formData.externalAccountReference}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                    placeholder="External reference"
                                                />
                                            </div>

                                            {/* Disregarded Entity Radio Buttons */}
                                            <div className="col-span-full space-y-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Disregarded Entity Options
                                                </label>

                                                <div className="space-y-3">
                                                    <label className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${formData.disregardedEntity === "disregarded" ? "bg-[#eaf5f7] border border-gray-200" : "bg-white border border-gray-200 cursor-pointer"
                                                        }`}>
                                                        <input
                                                            type="radio"
                                                            name="disregardedEntity"
                                                            value="disregarded"
                                                            checked={formData.disregardedEntity === "disregarded"}
                                                            onChange={handleInputChange}
                                                            style={{ accentColor: '#3b82f6' }}
                                                            className="h-4 w-4 rounded mt-1"
                                                        />
                                                        <div className="flex-1">
                                                            <span className="text-sm font-medium text-gray-700">
                                                                This Account is a Disregarded Entity
                                                            </span>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                A Disregarded Entity is an LLC with a single owner that has not elected to be considered a corporation.
                                                            </p>
                                                        </div>
                                                    </label>

                                                    <label className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${formData.disregardedEntity === "not-disregarded" ? "bg-[#eaf5f7] border border-gray-200" : "bg-white border border-gray-200 cursor-pointer"
                                                        }`}>
                                                        <input
                                                            type="radio"
                                                            name="disregardedEntity"
                                                            value="not-disregarded"
                                                            checked={formData.disregardedEntity === "not-disregarded"}
                                                            onChange={handleInputChange}
                                                            style={{ accentColor: '#3b82f6' }}
                                                            className="h-4 w-4 rounded mt-1"
                                                        />
                                                        <div className="flex-1">
                                                            <span className="text-sm font-medium text-gray-700">
                                                                This Account is Not a Disregarded Entity
                                                            </span>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                This LLC has elected to be considered a corporation by filing a 8832 Form.
                                                            </p>
                                                        </div>
                                                    </label>

                                                    <label className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${formData.disregardedEntity === "unknown" ? "bg-[#eaf5f7] border border-gray-200" : "bg-white border border-gray-200 cursor-pointer"
                                                        }`}>
                                                        <input
                                                            type="radio"
                                                            name="disregardedEntity"
                                                            value="unknown"
                                                            checked={formData.disregardedEntity === "unknown"}
                                                            onChange={handleInputChange}
                                                            style={{ accentColor: '#3b82f6' }}
                                                            className="h-4 w-4 rounded mt-1"
                                                        />
                                                        <div className="flex-1">
                                                            <span className="text-sm font-medium text-gray-700">
                                                                I don't know if this Account is a Disregarded Entity
                                                            </span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Holder Contact Information Section */}
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Holder Contact Information</h2>

                                        <div className="space-y-6">
                                            {/* Email and Phone Number */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="email@example.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        name="phoneNumber"
                                                        value={formData.phoneNumber}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="(555) 123-4567"
                                                    />
                                                </div>
                                            </div>

                                            {/* Address Fields */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address 1</label>
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
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address 2</label>
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
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
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
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
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
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Zipcode</label>
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
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                                    <select
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        {countries.map((country) => (
                                                            <option key={country} value={country}>{country}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Care of Fields */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Care of (c/o)
                                                        <span className="text-gray-500 font-normal ml-1">(optional)</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="careOf1"
                                                        value={formData.careOf1}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="Care of information"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Care of (c/o)
                                                        <span className="text-gray-500 font-normal ml-1">(optional)</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="careOf2"
                                                        value={formData.careOf2}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                                                        placeholder="Additional care of information"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Information Section */}
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Information</h2>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Default payment type</label>
                                            <select
                                                name="defaultPaymentType"
                                                value={formData.defaultPaymentType}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {paymentTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex justify-end space-x-4 pt-6">
                                        <button
                                            type="button"
                                            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white bg-[#95d7e1] font-medium px-4 py-1 rounded-sm hover:bg-[#6fc8d6] text-sm"
                                        >
                                            Create Account
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

export default CreateNewAccount;