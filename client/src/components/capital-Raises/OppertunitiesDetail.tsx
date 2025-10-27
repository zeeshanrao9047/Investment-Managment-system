import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAlarm } from "react-icons/cg";
import { FaCircleCheck } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { FaNotesMedical } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import image from "../layout/assets/login.avif";

const OpportunitiesDetail: React.FC = () => {
  const [activeStage, setActiveStage] = useState("Interested");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [opportunity, setOpportunity] = useState(true);
  const [commitments, setCommitments] = useState(true);
  const [people, setPeople] = useState(true);
  const [edits, setEdits] = useState(false);
  const [description, setDescription] = useState("Add a description here");

  const stages = [
    "Prospect",
    "Qualified",
    "Interested",
    "Reviewing",
    "Committing",
    "Complete",
    "Lost",
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTag();
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-20">
      <div className="grid grid-cols-1 lg:grid-cols-[.5fr_3fr_1.5fr] gap-1">
        {/* Left Column */}
        <div className="px-6 border border-gray-300 rounded-lg">
          <div className="mb-2 py-5 px-2 flex items-center justify-start gap-3">
            <div className="w-15 h-15 bg-blue-100 rounded-full text-3xl text-gray-400 flex items-center justify-center">
              $
            </div>
            <div className="text-gray-500">
              <p className="text-2xl">$100,000.00</p>
              <p>Micheal Weber</p>
              <div className="flex gap-7 text-md mt-1">
                <FaNotesMedical />
                <MdEmail />
                <AiOutlineMenuUnfold />
              </div>
            </div>
          </div>

          {/* About Section */}
          <h1
            className="font-medium text-gray-800 py-4 border-b border-t border-gray-400 mb-2 flex items-center gap-1 cursor-pointer"
            onClick={() => setOpportunity(!opportunity)}
          >
            About this opportunity{" "}
            <RiArrowDropDownLine
              className={`text-3xl ${
                opportunity
                  ? "rotate-180 transition-all duration-500"
                  : "transition-all duration-500"
              }`}
            />
          </h1>

          {opportunity && (
            <>
              {/* Description */}
              <div className="bg-white rounded-lg">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Description
                  </h2>
                  <span
                    className="text-sm font-medium text-blue-600 cursor-pointer"
                    onClick={() => setEdits(!edits)}
                  >
                    edit
                  </span>
                </div>
                {edits ? (
                  <input
                    type="text"
                    className="border rounded-lg border-gray-400 outline-none w-full py-1 pl-2"
                    placeholder="Add a description here"
                    value={description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setDescription(e.target.value)
                    }
                  />
                ) : (
                  <p className="text-gray-400">{description}</p>
                )}
              </div>

              {/* Stage */}
              <div className="bg-white rounded-lg mt-2">
                <h2 className="text-lg font-semibold text-gray-800">Stage</h2>
                <p className="text-sm text-gray-400">{activeStage}</p>
              </div>

              {/* Capital Raise */}
              <div className="bg-white rounded-lg mt-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Capital Raise
                  </h2>
                  <span className="text-sm font-medium text-blue-600">
                    edit
                  </span>
                </div>
                <p className="text-blue-400">
                  Orlando Rentals Multi-class 50Bb
                </p>
              </div>

              {/* Expected Commitment */}
              <div className="bg-white rounded-lg mt-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Expected Commitment
                  </h2>
                  <span className="text-sm font-medium text-blue-600">
                    edit
                  </span>
                </div>
                <p className="text-gray-400">$100,000.00</p>
              </div>

              {/* Primary Contact */}
              <div className="bg-white rounded-lg mt-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Primary Contact
                  </h2>
                  <span className="text-sm font-medium text-blue-600">
                    edit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-sm font-medium text-gray-500">
                    MW
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-600">
                      Michael Weber
                    </span>
                    <p className="text-gray-400">Primary Contact</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg mt-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-0">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add tag"
                    className="flex-1 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={addTag}
                    className="px-2 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Middle Column */}
        <div>
          <div className="bg-white  rounded-lg shadow-sm border border-gray-300 py-6 px-3">
            <div className="flex flex-wrap bg-blue-400 rounded">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setActiveStage(stage)}
                  className={`px-2.5 py-2 text-sm font-medium transition-colors ${
                    activeStage === stage
                      ? " bg-blue-700 text-white"
                      : " text-white hover:bg-blue-600"
                  }`}
                >
                  {stage}
                </button>
              ))}
    
          </div>
          {/* Action Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 py-6 px-3 mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              ACTION ITEMS
            </h2>

            <div className="space-y-6">
              {/* Action Item 1 */}
              <div className="border shadow-lg border-gray-200 px-4 py-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">
                      Note created by Alan Turing
                    </p>
                    <p className="text-sm text-gray-500 mb-2 ">
                      Dec 27 2023 07:22 PM
                    </p>
                  </div>
                  <RiDeleteBin6Line className="text-blue-500 cursor-pointer" />
                </div>
                <p className="text-gray-700 border-t border-gray-300 ">
                  Lorem ipsum dolor sit amet consectetur. Viverra id est vel ut
                  nulla fermentum sapien. Potenti
                </p>
              </div>

              {/* Action Item 2 */}
              <div className="border shadow-lg border-gray-200 px-4 py-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">
                      Tate created by Alan Turing - Assigned to Alan Turing
                    </p>
                    <p className="text-sm text-gray-500 mb-2 ">
                      Dec 27 2023 07:22 PM
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[7px] bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center gap-1">
                      <CgAlarm /> Due on Dec 31 2023
                    </span>
                    <RiDeleteBin6Line className="text-blue-500 cursor-pointer" />
                    <CiCircleCheck className="text-blue-500 cursor-pointer" />
                  </div>
                </div>
                <p className="text-gray-700 border-t border-gray-300 ">
                  Lorem ipsum dolor sit amet consectetur. Viverra id est vel ut
                  nulla fermentum sapien. Potenti
                </p>
              </div>

              {/* Action Item 3 */}
              <div className="border shadow-lg border-gray-200 px-4 py-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">
                      Tate created by Alan Turing - Assigned to Alan Turing
                    </p>
                    <p className="text-sm text-gray-500 mb-2 ">
                      Dec 27 2023 07:22 PM
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                      <FaCircleCheck /> Complete
                    </span>
                    <RiDeleteBin6Line className="text-blue-500 cursor-pointer" />
                    <FaCircleCheck className="text-green-800 cursor-pointer" />
                  </div>
                </div>
                <p className="text-gray-700 border-t border-gray-300 ">
                  Lorem ipsum dolor sit amet consectetur. Viverra id est vel ut
                  nulla fermentum sapien. Potenti
                </p>
              </div>
            </div>
            <button className="mt-5 w-full border py-2 rounded border-blue-600 text-blue-600">
              + Add New
            </button>
          </div>
        </div>
</div>
        {/* Right Column */}
        <div className="border border-gray-300 rounded-lg shadow-sm">
          <div className="bg-white py-6 px-2">
            <h2
              className="text-lg font-semibold text-gray-800 mb-1 pb-2 border-b border-gray-300 cursor-pointer flex"
              onClick={() => setCommitments(!commitments)}
            >
              Commitments{" "}
              <RiArrowDropDownLine
                className={`text-3xl ${
                  commitments
                    ? "rotate-180 transition-all duration-500"
                    : "transition-all duration-500"
                }`}
              />
            </h2>
            {commitments && (
              <div className="py-2 bg-gray-50 rounded-lg flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-gray-500">
                  @
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">
                    $100,000.00 • Michael Weber LLC
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Status:{" "}
                    <span className="bg-blue-500 text-white py-1 px-2 rounded-full">
                      In Progress
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* People */}
          <div className="bg-white px-2">
            <h2
              className="text-lg font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-2 flex"
              onClick={() => setPeople(!people)}
            >
              People{" "}
              <RiArrowDropDownLine
                className={`text-3xl ${
                  people
                    ? "rotate-180 transition-all duration-500"
                    : "transition-all duration-500"
                }`}
              />
            </h2>
            {people && (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg flex gap-2 items-center">
                  <img src={image} className="w-12 h-12 rounded-full" alt="" />
                  <div>
                    <p className="font-medium text-blue-600">Michael Weber</p>
                    <p className="text-sm text-gray-600">
                      Primary <br /> Contact
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg flex gap-2 items-center">
                  <img src={image} className="w-12 h-12 rounded-full" alt="" />
                  <p className="font-medium text-blue-600">Michael Weber</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesDetail;
