import React, { useState } from "react";
import { Link } from "wouter";
import cntimg from "../../../public/assets/capital-raises-cards-img.png"
import {
    FiFilter,
    FiChevronDown,
    FiTag,
    FiUserPlus,
    FiUsers,
    FiTrash2,
} from "react-icons/fi";

interface Contact {
    id: number;
    name: string;
    email: string;
    status: string;
    warning: string;
    selected: boolean;
}

// Add Tags Modal Component
interface AddTagsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTags: (tag: string) => void;
}

const AddTagsModal: React.FC<AddTagsModalProps> = ({ isOpen, onClose, onAddTags }) => {
    const [tagInput, setTagInput] = useState("");

    const handleAddTags = () => {
        const tagValue = tagInput.trim();
        if (tagValue) {
            onAddTags(tagValue);
            setTagInput("");
            onClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTags();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Modal Header */}
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Add Tags</h2>
                </div>

                {/* Modal Content */}
                <div className="p-4">
                    <div className="mb-4">
                        <label htmlFor="tagInput" className="block text-sm font-medium text-gray-700 mb-1">
                            Tag
                        </label>
                        <input
                            type="text"
                            id="tagInput"
                            placeholder="Enter tag..."
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddTags}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    >
                        Add Tags
                    </button>
                </div>
            </div>
        </div>
    );
};

const dummyContacts: Contact[] = [
    {
        id: 1,
        name: "Francisco Rosales",
        email: "alonsosotoval@gmail.com",
        status: "Not Invited",
        warning: "Missing Linked ACH",
        selected: false,
    },
    {
        id: 2,
        name: "Marie Anderson",
        email: "andersonmarie412@gmail.com",
        status: "Registered",
        warning: "Missing Linked ACH",
        selected: false,
    },
    {
        id: 3,
        name: "John Smith",
        email: "johnsmith1986@investnext.com",
        status: "Not Invited",
        warning: "Missing Linked ACH",
        selected: false,
    },
];

const ColumnFilterDropdown: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = ["Option A", "Option B", "Option C", "Option D"];

    const toggleOption = (opt: string) => {
        setSelectedOptions((prev) =>
            prev.includes(opt)
                ? prev.filter((x) => x !== opt)
                : [...prev, opt]
        );
    };

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="ml-1 text-gray-500 hover:text-gray-700"
            >
                <FiFilter size={13} />
            </button>
            {open && (
                <div className="absolute z-10 bg-white border border-gray-200 shadow-lg rounded-md mt-1 w-48 p-2 text-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs mb-2"
                    />
                    <div className="max-h-28 overflow-y-auto">
                        {options
                            .filter((opt) =>
                                opt.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((opt) => (
                                <label key={opt} className="flex items-center gap-2 mb-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(opt)}
                                        onChange={() => toggleOption(opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ContactPage: React.FC = () => {
    const [contacts, setContacts] = useState(dummyContacts);
    const [filterVisible, setFilterVisible] = useState(false);
    const [actionsOpen, setActionsOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [isAddTagsModalOpen, setIsAddTagsModalOpen] = useState(false);

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setContacts(contacts.map((c) => ({ ...c, selected: newSelectAll })));
    };

    const toggleSelect = (id: number) => {
        setContacts(
            contacts.map((c) =>
                c.id === id ? { ...c, selected: !c.selected } : c
            )
        );
    };

    const filteredContacts = contacts.filter((c) =>
        c.name.toLowerCase().includes(searchName.toLowerCase())
    );

    // Add Tags functionality
    const handleAddTags = (tag: string) => {
        // Yahan aap selected contacts ko tags assign kar sakte hain
        const selectedContacts = contacts.filter(c => c.selected);
        console.log(`Adding tag "${tag}" to:`, selectedContacts.map(c => c.name));
        // Yahan aap actual API call ya state update kar sakte hain
    };

    const handleAddTagsClick = () => {
        // Direct modal show karo without any validation
        setIsAddTagsModalOpen(true);
        setActionsOpen(false);
    };

    return (
        <div>
            <div className="flex justify-center sm:justify-between items-center mb-4 gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                    <form className="w-full">
                        <select
                            id="countries"
                            className="border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option selected>All Contacts</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                    </form>
                    <div className="relative">
                        <button className="flex items-center gap-1 border border-gray-300 rounded-sm px-2 py-1 text-sm hover:bg-gray-100">
                            Export <FiChevronDown />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setFilterVisible(!filterVisible)}
                        className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded-sm text-sm hover:bg-gray-100"
                    >
                        <FiFilter /> Filter
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setActionsOpen(!actionsOpen)}
                            className="flex items-center gap-1 bg-[#95d7e1] text-white px-2 py-1 rounded-sm text-sm font-medium hover:bg-[#6fc8d6]"
                        >
                            Actions <FiChevronDown />
                        </button>
                        {actionsOpen && (
                            <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                                <button className="flex items-center w-full text-left px-4 py-2 hover:text-white hover:bg-[#6fc8d6] text-sm gap-2">
                                    <FiUserPlus /> Invite to Portal
                                </button>
                                <button
                                    className="flex items-center w-full text-left px-4 py-2 hover:text-white hover:bg-[#6fc8d6] text-sm gap-2"
                                    onClick={handleAddTagsClick}
                                >
                                    <FiTag /> Add Tag
                                </button>
                                <button className="flex items-center w-full text-left px-4 py-2 hover:text-white hover:bg-[#6fc8d6] text-sm gap-2">
                                    <FiTrash2 /> Remove Tag
                                </button>
                                <button className="flex items-center w-full text-left px-4 py-2 hover:text-white hover:bg-[#6fc8d6] text-sm gap-2">
                                    <FiUsers /> Assign Teams
                                </button>
                            </div>
                        )}
                    </div>
                    <Link to="/createnewcontact">
                        <button className="text-white bg-[#95d7e1] font-medium px-3 py-1 rounded-sm hover:bg-[#6fc8d6] text-sm">
                            + New Contact
                        </button>
                    </Link>
                </div>
            </div>

            {/* === Filter Section === */}
            {filterVisible && (
                <div className="mb-4 bg-gray-50 border border-gray-200 rounded p-3 flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-1/3 focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-1/3">
                        <option value="">Portal Status</option>
                        <option value="Registered">Registered</option>
                        <option value="Not Invited">Not Invited</option>
                    </select>
                    <button
                        onClick={() => setFilterVisible(false)}
                        className="bg-[#95d7e1] text-white rounded-sm px-2 py-1 text-sm hover:bg-[#51bfcf]"
                    >
                        Apply Filters
                    </button>
                </div>
            )}

            {/* === Table === */}
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border border-gray-200 rounder-lg text-sm whitespace-nowrap">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-2 text-left font-medium">Name</th>
                            <th className="p-2 text-left font-medium">Tags</th>
                            <th className="p-2 text-left font-medium">Email</th>
                            <th className="p-2 text-left font-medium">Portal Status</th>
                            <th className="p-2 text-left font-medium">Warnings</th>
                            <th className="p-2 text-left font-medium">Active</th>
                        </tr>

                        {/* Filter Inputs Row with icon */}
                        <tr className="bg-white">
                            <td className="p-2"></td>
                            <td className="p-2">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Filter by Name"
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-400"
                                        value={searchName}
                                        onChange={(e) => setSearchName(e.target.value)}
                                    />
                                    <ColumnFilterDropdown />
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Filter by Tag"
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-400"
                                    />
                                    <ColumnFilterDropdown />
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Filter by Email"
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-400"
                                    />
                                    <ColumnFilterDropdown />
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Portal Status"
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-400"
                                    />
                                    <ColumnFilterDropdown />
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Filter by Warning"
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-400"
                                    />
                                    <ColumnFilterDropdown />
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Filter by Warning"
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-400"
                                    />
                                    <ColumnFilterDropdown />
                                </div>
                            </td>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {filteredContacts.map((c) => (
                            <tr
                                key={c.id}
                                className={`${c.selected ? "bg-blue-50" : "bg-white"} border-b-2 hover:bg-gray-50`}
                            >
                                <td className="p-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={c.selected}
                                        onChange={() => toggleSelect(c.id)}
                                    />
                                </td>
                                <td className="p-2 ps-0 pe-12 text-blue-600">
                                    <Link to="/contactsdetail">
                                        <div className="flex items-center gap-2 text-xs">
                                            <img
                                                src={cntimg}
                                                alt={c.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            {c.name}
                                        </div>
                                    </Link>
                                </td>
                                <td className="p-2">
                                    <div className="flex gap-1">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 text-xs rounded-full">
                                            Class A
                                        </span>
                                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 text-xs rounded-full">
                                            Friends & Family
                                        </span>
                                        <span className="bg-gray-200 font-semibold text-black px-2 py-0.5 text-xs rounded-full">
                                            +10
                                        </span>
                                    </div>
                                </td>
                                <td className="p-2">{c.email}</td>
                                <td className="p-2">
                                    <span
                                        className={`${c.status === "Registered"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                            } text-xs px-2 py-1 rounded-full`}
                                    >
                                        {c.status}
                                    </span>
                                </td>
                                <td className="p-2">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                        {c.warning}
                                    </span>
                                </td>
                                <td className="p-2 text-gray-700 text-center">Yes</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Tags Modal */}
            <AddTagsModal
                isOpen={isAddTagsModalOpen}
                onClose={() => setIsAddTagsModalOpen(false)}
                onAddTags={handleAddTags}
            />
        </div>
    );
};

export default ContactPage;