import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React, { useState } from "react";
import { MdAttachEmail } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { MdPlaylistAdd } from "react-icons/md";
import Profileimg from "../../public/assets/profileimg.jpg";
import { GoPlus } from "react-icons/go";
import { FaPencilAlt } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function Contactsdetail() {
  const heading = "Contacts";
  const [menu, setMenu] = useState(true);
  const [activemenu, setActivemenu] = useState(true);
  const [activeaccounts, setActiveaccounts] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");
  const handlemenu = () => {
    setMenu((prev) => !prev);
  };
  const handleactivemenu = () => {
    setActivemenu((prev) => !prev);
  };
  const handleactiveacount = () => {
    setActiveaccounts((prev) => !prev);
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header value={heading} />
          <main className="max-w-full p-3 md:p-5 mt-[65px] lg:mt-0 transition-all duration-100 ease-in-out">
            <div className="grid grid-cols-12 p-3 md:p-6 rounded-md shadow-2xl gap-4">
              <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3 h-fit border-2 border-gray-300 rounded-sm">
                <div className=" px-4 py-3 ">
                  <div className="flex items-start justify-between">
                    <div className="w-[90px] h-[90px] rounded-full">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                        src={Profileimg}
                        alt="contactimg"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium capitalize mb-2">
                        ashutosdh singh
                      </h4>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center rounded-sm  w-7 h-7 text-[#3b60e6] bg-[#c7d7fc]">
                          <MdAttachEmail className=" text-lg" />
                        </span>
                        <span className="flex items-center justify-center rounded-sm  w-7 h-7 text-[#3b60e6] bg-[#c7d7fc]">
                          <RiStickyNoteAddFill className=" text-lg" />
                        </span>
                        <span className="flex items-center justify-center rounded-sm  w-7 h-7 text-[#3b60e6] bg-[#c7d7fc]">
                          <MdPlaylistAdd className=" text-lg" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <h4 className="font-medium mb-0 py-3 capitalize px-3 border-t-2 border-b-2 border-gray-200 flex items-center gap-3">
                      about this contact
                      <span onClick={handlemenu} className="cursor-pointer">
                        {menu === true ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </h4>
                  </div>
                  <div
                    className={`${
                      menu
                        ? "h-[60vh] opacity-100 overflow-y-scroll transition-all duration-200 ease-in-out"
                        : "h-0 opacity-0 overflow-hidden transition-all duration-200 ease-in-out"
                    }`}
                  >
                    <ul
                      className={`${
                        menu === true
                          ? "block transition-colors duration-300 ease-in-out "
                          : " hidden transition-colors duration-300 ease-in-out "
                      } p-3`}
                    >
                      <li className="mb-3">
                        <div>
                          <h5 className="capitalize font-medium ">email</h5>
                          <a className="text-blue-300">singh@gmail.com</a>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <h5 className="capitalize font-medium">
                            primary phone
                          </h5>
                          <h5 className="text-gray-500">(917)952-3388</h5>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <h5 className="capitalize font-medium">Address</h5>
                          <h5 className="text-gray-500">
                            94 mahrain road morris plains MJ 7950
                          </h5>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <h5 className="capitalize font-medium mb-1">Tags</h5>

                          <span className="bg-blue-700 px-3 py-1 rounded-full text-sm text-white text-wrap">
                            Passes KYC / AML
                            <button className="font-medium ml-2 bg-white text-blue-700 w-4 h-4 rounded-full text-xs text-center">
                              X
                            </button>
                          </span>
                          <div>
                            <button className="w-fit px-3 flex items-center gap-2 mt-3 rounded-full border-2 border-gray-400">
                              {" "}
                              <GoPlus /> Add Tags
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <h5 className="capitalize font-medium  flex items-center gap-1">
                            Teams <FaPencilAlt />{" "}
                          </h5>
                          <p className="text-gray-500 capitalize text-sm">
                            no Tems assigned
                          </p>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <p className="capitalize font-medium  flex items-center gap-1">
                            are you on accuredited investor or qualified
                            purchase under the SEC guidelines
                          </p>
                          <h5 className="text-gray-500 capitalize text-sm flex items-center gap-2">
                            <span>yes</span>
                            <FaPencilAlt />{" "}
                          </h5>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <p className="capitalize font-medium  flex items-center gap-1">
                            do you want to invest on a deal-by-deal basic and/or
                            in commited focoused funds
                          </p>
                          <h5 className="text-gray-500 capitalize text-sm flex items-center gap-2">
                            <span>both</span>
                            <FaPencilAlt />{" "}
                          </h5>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <p className="capitalize font-medium  flex items-center gap-1">
                            do you ewant to incest capital aqnd/or private
                            equity opportunities
                          </p>
                          <h5 className="text-gray-500 capitalize text-sm flex items-center gap-2">
                            <span>yes</span>
                            <FaPencilAlt />{" "}
                          </h5>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <p className="capitalize font-medium  flex items-center gap-1">
                            whats type of private equity opportunities are you
                            interested investing in?
                          </p>
                          <h5 className="text-gray-500 capitalize text-sm flex items-center gap-2">
                            <span>all private equity sectors below</span>
                            <FaPencilAlt />{" "}
                          </h5>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <p className="capitalize font-medium  flex items-center gap-1">
                            do you have a preferenbces or qaffinity for
                            investing in specific geographies (north america ,
                            latam , euprape asia-pracific , middle east
                            affrics)?
                          </p>
                          <h5 className="text-gray-500 capitalize text-sm flex items-center gap-2">
                            <span>
                              "im interested in opportunities globaly"
                            </span>
                            <FaPencilAlt />{" "}
                          </h5>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <p className="capitalize font-medium  flex items-center gap-1">
                            do you have an affinity for investesting in
                            founderes from specific universities and / or mba
                            programs
                          </p>
                          <h5 className="text-gray-500 capitalize text-sm flex items-center gap-2">
                            <span>no</span>
                            <FaPencilAlt />{" "}
                          </h5>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div>
                          <p className="capitalize font-medium  flex items-center gap-1">
                            who refered you to us ?(if applicable)
                          </p>
                          <h5 className="text-gray-500 capitalize text-sm flex items-center gap-2">
                            <span>no value</span>
                            <FaPencilAlt />{" "}
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="order-3 xl:order-2 col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6">
                <div>
                  {/* Tab Buttons */}
                  <div className="block sm:flex items-center justify-between">
                    <div className="flex flex-wrap border-b-2 border-gray-200 justify-center sm:justify-start">
                      <button
                        onClick={() => setActiveTab("tab1")}
                        className={`capitalize px-4 py-2 text-sm font-medium ${
                          activeTab === "tab1"
                            ? "border-b-2 border-blue-500 text-[#3b60e6]"
                            : "text-gray-600 hover:text-[#3b60e6]"
                        }`}
                      >
                        activity
                      </button>
                      <button
                        onClick={() => setActiveTab("tab2")}
                        className={`capitalize px-4 py-2 text-sm font-medium ${
                          activeTab === "tab2"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                        }`}
                      >
                        Notes
                      </button>
                      <button
                        onClick={() => setActiveTab("tab3")}
                        className={`capitalize px-4 py-2 text-sm font-medium ${
                          activeTab === "tab3"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                        }`}
                      >
                        tasks
                      </button>
                      <button
                        onClick={() => setActiveTab("tab4")}
                        className={`capitalize px-4 py-2 text-sm font-medium ${
                          activeTab === "tab4"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                        }`}
                      >
                        emails
                      </button>
                      <button
                        onClick={() => setActiveTab("tab5")}
                        className={`capitalize px-4 py-2 text-sm font-medium ${
                          activeTab === "tab5"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-600 hover:text-blue-500"
                        }`}
                      >
                        documents
                      </button>
                    </div>
                    <div>
                      <button className="uppercase mt-3 sm:mt-0  flex items-center gap-2 text-[#3b60e6] bg-[#c7d7fc] px-3 py-1 rounded-sm">
                        new <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                  {/* Tab Content */}
                  <div className="pt-[20px]">
                    {activeTab === "tab1" && <p>Content for Tab 1</p>}
                    {activeTab === "tab2" && <p>Content for Tab 2</p>}
                    {activeTab === "tab3" && <p>Content for Tab 3</p>}
                    {activeTab === "tab4" && <p>Content for Tab 4</p>}
                    {activeTab === "tab5" && <p>Content for Tab 5</p>}
                  </div>
                </div>
              </div>
              <div className="order-2 xl:order-3 col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3 h-fit border-2 border-gray-300 rounded-sm">
                <div className=" px-4 py-3 ">
                  <h3 className="capitalize mb-4">opportunities(5)</h3>
                  <div className="grid grid-col-1 gap-y-3">
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <h4 className="font-medium mb-0 py-3 capitalize px-3 border-t-0 border-b-2 border-gray-200 flex items-center gap-3">
                      active investment
                      <span
                        onClick={handleactivemenu}
                        className="cursor-pointer"
                      >
                        {activemenu === true ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </h4>
                  </div>
                  <div
                    className={`${
                      activemenu === true ? "h-[25vh]" : "h-0 hidden"
                    }  overflow-y-scroll grid grid-col-1 gap-y-3 p-3`}
                  >
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opprtunities-sec">
                  <div className="flex items-center justify-between px-3 border-t-0 border-b-2 border-gray-200  ">
                    <h4 className="font-medium mb-0 py-3 capitalize  flex items-center gap-3">
                      accounts
                      <span
                        onClick={handleactiveacount}
                        className="cursor-pointer"
                      >
                        {activeaccounts === true ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </h4>
                    <button>
                      <FaPlus />
                    </button>
                  </div>
                  <div
                    className={`${
                      activeaccounts === true ? "h-[20vh]" : "h-0 hidden"
                    } overflow-y-scroll grid grid-col-1 gap-y-3 p-3`}
                  >
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-start">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          className="rounded-full h-full w-full object-cover"
                          src={Profileimg}
                          alt="userimg"
                        />
                      </div>
                      <div>
                        <h5 className="text-[#3b60e6] font-medium">
                          Contrailing
                        </h5>
                        <h5 className="text-gray-500">
                          <span className="me-1 ">Funded</span>$5,000.00
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
