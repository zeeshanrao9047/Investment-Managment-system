import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { CommonContext } from "@/context/Contextprovider";
import { useContext, useEffect, useRef, useState } from "react";
import Main from "@/components/layout/Main";
import { MdOutlineSpaceDashboard, MdAttachEmail } from "react-icons/md";
import { Link } from "wouter";
import { GoDotFill } from "react-icons/go";
import { Editor } from "primereact/editor";
import { GrFormEdit } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { LucideAsterisk } from "lucide-react";

export default function Communications() {
  const investmentFields = [
    "first name",
    "last name",
    "email",
    "birthday",
    "company",
    "job title",
    "address",
    "city",
    "state",
    "zipcode",
    "soft com..",
  ];

  const customFields = [
    "Are you",
    "Do you",
    "What the",
    "What ref",
    "Are you the",
    "Do you need",
    "What t",
  ];
  const newFields = [
    { label: "abc", type: "text" },
    { label: "custom textarea", type: "textarea" },
    { label: "Numbers", type: "number" },
    { label: "radio buttons", type: "radio" },
    { label: "check boxes", type: "checkbox" },
    { label: "Date", type: "date" },
  ];
  const heading = "communications";
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState("tab1");
  const [header, setHeader] = useState("Register");
  const [body, setBody] = useState("join UV investor portal");

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("CommonContext must be used inside ContextProvider");
  }

  const [selectedFields, setSelectedFields] = useState([]);

  const toggleField = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  return (
    <div className="block md:flex">
      <Sidebar />
      <div className="w-full overflow-x-auto">
        <Header value={heading} />
        <Main>
          <div>
            {/* Tab Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap text-center md:text-start pb-5 border-b-2 border-gray-200 font-xs w-full">
                <div>
                  <button
                    onClick={() => setActiveTab("tab1")}
                    className={`capitalize px-4 py-2 text-sm font-medium ${
                      activeTab === "tab1"
                        ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                        : "text-gray-600 hover:text-[#95D7E1]"
                    }`}
                  >
                    portal updates
                  </button>
                  <button
                    onClick={() => setActiveTab("tab2")}
                    className={`capitalize px-4 py-2 text-sm font-medium ${
                      activeTab === "tab2"
                        ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                        : "text-gray-600 hover:text-[#95D7E1]"
                    }`}
                  >
                    Email Center
                  </button>
                  <button
                    onClick={() => setActiveTab("tab3")}
                    className={`capitalize px-4 py-2 text-sm font-medium ${
                      activeTab === "tab3"
                        ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                        : "text-gray-600 hover:text-[#95D7E1]"
                    }`}
                  >
                    Forms
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "tab1" && (
                <>
                  <div className="flex items-center justify-end">
                    <div className="relative py-5 " ref={dropdownRef}>
                      <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="px-4 py-2 bg-[#95D7E1] text-[#3b60e6] hover:text-white rounded-md"
                      >
                        Actions
                      </button>

                      {open && (
                        <div className="absolute top-[55px] right-0 w-max mt-2 border-2 py-4  rounded-md shadow-lg bg-white z-50">
                          <ul className="grid grid-cols-1 gap-y-3 capitalize text-gray-600">
                            <li className="hover:bg-[#95D7E1] py-1 px-3 flex items-center">
                              <MdOutlineSpaceDashboard />
                              <button
                                onClick={() => setActiveTab("tab4")}
                                className={`capitalize px-4  text-sm font-medium ${
                                  activeTab === "tab4"
                                    ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                                    : "hover:text-gray-600 "
                                }`}
                              >
                                portal updates
                              </button>
                            </li>
                            <li className="hover:bg-[#95D7E1] py-1 px-3">
                              <Link to="#" className="flex items-center gap-3">
                                <MdAttachEmail />
                                <span>Email</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* Example Table */}
                    <div className="border-2 relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 capitalize">title</th>
                            <th className="px-6 py-3 capitalize">
                              create Date
                            </th>
                            <th className="px-6 py-3 capitalize">
                              last modified date
                            </th>
                            <th className="px-6 py-3 capitalize">status</th>
                            <th className="px-6 py-3 capitalize">
                              publish date
                            </th>
                            <th className="px-6 py-3 capitalize">project</th>
                            <th className="px-6 py-3 capitalize">shared</th>
                          </tr>
                          {/* Search row */}
                          <tr className="bg-white dark:bg-gray-800">
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search name"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]"></th>
                            <th className="px-6 py-2 min-w-[200px]"></th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search contributations"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]"></th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search accrued"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search accrued"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                            <td className="px-6 py-4">
                              <Link to="/projectdetail">apple</Link>
                            </td>
                            <td className="px-6 py-4">aug,29 11:30 Pm</td>
                            <td className="px-6 py-4">aug,29 11:30 Pm</td>
                            <td className="px-6 py-4">publish</td>
                            <td className="px-6 py-4">aug,29 2025</td>
                            <td className="px-6 py-4">$2000</td>
                            <td className="px-6 py-4">$2000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "tab2" && (
                <>
                  <div className="flex items-center justify-end ">
                    <div className="relative py-5 " ref={dropdownRef}>
                      <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="px-4 py-2 bg-[#95D7E1] text-[#3b60e6] hover:text-white rounded-md"
                      >
                        Actions
                      </button>

                      {open && (
                        <div className="absolute top-[55px] right-0 w-max mt-2 border-2 py-4  rounded-md shadow-lg bg-white z-50">
                          <ul className="grid grid-cols-1 gap-y-3 capitalize text-gray-600">
                            <li className="hover:bg-[#95D7E1] py-1 px-3 flex items-center">
                              <MdOutlineSpaceDashboard />
                              <button
                                onClick={() => setActiveTab("tab4")}
                                className={`capitalize px-4  text-sm font-medium ${
                                  activeTab === "tab4"
                                    ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                                    : "hover:text-gray-600 "
                                }`}
                              >
                                portal updates
                              </button>
                            </li>
                            <li className="hover:bg-[#95D7E1] py-1 px-3">
                              <Link to="#" className="flex items-center gap-3">
                                <MdAttachEmail />
                                <span>Email</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* Example Table */}
                    <div className="border-2 relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 capitalize">subject</th>
                            <th className="px-6 py-3 capitalize">status</th>
                            <th className="px-6 py-3 capitalize">author</th>
                            <th className="px-6 py-3 capitalize">created</th>
                            <th className="px-6 py-3 capitalize">teams</th>
                          </tr>
                          {/* Search row */}
                          <tr className="bg-white dark:bg-gray-800">
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search name"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search accounts"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search balance"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]"></th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search distributions"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                            <td className="px-6 py-4">
                              <Link to="/projectdetail">apple</Link>
                            </td>
                            <td className="px-6 py-4">aug,29 11:30 Pm</td>
                            <td className="px-6 py-4">aug,29 11:30 Pm</td>
                            <td className="px-6 py-4">publish</td>
                            <td className="px-6 py-4">aug,29 2025</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "tab3" && (
                <>
                  <div className="flex items-center justify-end">
                    <div className="relative py-5 " ref={dropdownRef}>
                      <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="px-4 py-2 bg-[#95D7E1] text-[#3b60e6] hover:text-white rounded-md"
                      >
                        Actions
                      </button>

                      {open && (
                        <div className="absolute top-[55px] right-0 w-max mt-2 border-2 py-4  rounded-md shadow-lg bg-white z-50">
                          <ul className="grid grid-cols-1 gap-y-0 capitalize text-gray-600">
                            <li className="hover:bg-[#95D7E1] py-1 px-3 flex items-center">
                              <GrFormEdit />
                              <button
                                onClick={() => setActiveTab("tab5")}
                                className={`capitalize px-4  text-sm font-medium ${
                                  activeTab === "tab5"
                                    ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                                    : "hover:text-gray-600 "
                                }`}
                              >
                                Edit form
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* Example Table */}
                    <div className="border-2 relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead>
                          <tr>
                            {/* ✅ New column for checkbox */}
                            <th className="px-6 py-3">
                              <input type="checkbox" />
                            </th>
                            <th className="px-6 py-3 capitalize">name</th>
                            <th className="px-6 py-3 capitalize">email</th>
                            <th className="px-6 py-3 capitalize">phone</th>
                            <th className="px-6 py-3 capitalize">status</th>

                            <th className="px-6 py-3 capitalize">time stump</th>
                            <th className="px-6 py-3 capitalize">
                              are your accredited in{" "}
                            </th>
                          </tr>

                          <tr className="bg-white dark:bg-gray-800">
                            <th className="px-6 py-2">
                              <input type="checkbox" />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search name"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search contributations"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search contributations"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search contributations"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]">
                              <input
                                type="text"
                                placeholder="Search accrued"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                              />
                            </th>
                            <th className="px-6 py-2 min-w-[200px]"></th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                            <td className="px-6 py-4">
                              <input type="checkbox" />
                            </td>
                            <td className="px-6 py-4">
                              <Link to="/projectdetail">zee dev</Link>
                            </td>
                            <td className="px-6 py-4">zee@gmail.com</td>
                            <td className="px-6 py-4">0303000000</td>
                            <td className="px-6 py-4">approved</td>
                            <td className="px-6 py-4">sep-01-2025, 10:26 Pm</td>
                            <td className="px-6 py-4">yes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "tab4" && (
                <div className="border-2 rounded-md my-7">
                  <h1 className="capitalize flex items-center gap-1 py-4 px-3 border-b-2">
                    New Portal update <GoDotFill className="text-blue-800" />
                  </h1>
                  <form action="" className="flex justify-center">
                    <div className="grid grid-cols-4 gap-y-7 w-full max-w-xl mx-auto p-3 md:p-8">
                      <div className="col-span-4 block md:flex items-center gap-12">
                        <label
                          htmlFor=""
                          className="capitalize font-medium w-[200px]"
                        >
                          Title:
                        </label>
                        <input
                          type="text"
                          placeholder="Update Title"
                          className="w-full px-4 py-1 border-2 rounded-sm"
                        />
                      </div>
                      <div className="col-span-4 block md:flex items-center gap-12">
                        <label
                          htmlFor=""
                          className="capitalize font-medium w-[200px]"
                        >
                          publish date:
                        </label>
                        <input
                          type="date"
                          placeholder="Publish Date"
                          className="w-full px-4 py-1 border-2 rounded-sm"
                        />
                      </div>
                      <div className="col-span-4 block md:flex items-center gap-12">
                        <label
                          htmlFor=""
                          className="capitalize font-medium w-[200px]"
                        >
                          associated with:
                        </label>
                        <input
                          type="search"
                          placeholder="Publish Date"
                          className="w-full px-4 py-1 border-2 rounded-sm"
                        />
                      </div>
                      <div className="col-span-4 block md:flex items-center gap-12">
                        <label
                          htmlFor=""
                          className="capitalize font-medium w-[200px]"
                        >
                          teams:
                        </label>
                        <input
                          type="date"
                          placeholder="Publish Date"
                          className="w-full px-4 py-1 border-2 rounded-sm"
                        />
                      </div>
                      <div className="col-span-4 block md:flex items-center gap-12">
                        <label
                          htmlFor=""
                          className="capitalize font-medium w-[200px]"
                        >
                          audience:
                        </label>
                        <div className="grid grid-col-1 gap-y-4">
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              placeholder="Publish Date"
                              className=" px-4 py-1 border-2 rounded-sm"
                            />
                            <div>
                              <h5 className="capitalize font-medium">
                                all portal users
                              </h5>
                              <p className="capitalize text-sm">
                                all registered portal users will have access to
                                this update
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              placeholder="Publish Date"
                              className=" px-4 py-1 border-2 rounded-sm"
                            />
                            <div>
                              <h5 className="capitalize font-medium ">
                                select audience
                              </h5>
                              <p className="capitalize text-sm">
                                only portal users in the selected contact
                                filters will have access to this
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4">
                        {/* <textarea
                          className="w-full px-5 py-3 border-2 rounded-sm"
                          name=""
                          id=""
                          rows="10"
                          placeholder="Type Something"
                        ></textarea> */}
                        <Editor
                          value={text}
                          onTextChange={(e) => setText(e.htmlValue)}
                          style={{ height: "320px" }}
                          placeholder="type something"
                        />
                      </div>
                      <div className="col-span-4">
                        <div className="py-5 flex gap-4">
                          <button className="capitalize px-4 py-1.5 bg-[#3b60e6] rounded-sm text-white font-normal">
                            create draft
                          </button>
                          <button className="capitalize px-4 py-1.5 bg-gray-300 rounded-sm text-black font-normal">
                            cancle
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {activeTab === "tab5" && (
                <div className="border-2 rounded-md my-7">
                  <div className="border-b-2 flex items-center justify-between px-3">
                    <h1 className="capitalize font-medium flex items-center gap-1 py-4  ">
                      investor lead form
                    </h1>
                    <button className="px-3 py-1 text-white bg-blue-600 rounded-sm flex items-center gap-x-2">
                      <FaEye /> Preview
                    </button>
                  </div>
                  <div className="grid grid-cols-12 gap-5">
                    {/* Left Sidebar */}
                    <div className="col-span-12  md:col-span-6 lg:col-span-4 border-r h-[90vh] overflow-y-auto p-4 md:pr-0">
                      <form>
                        {/* Header */}
                        <div className="flex items-center gap-x-5 mb-4">
                          <label className="text-xs uppercase w-[50px]">
                            Header:
                          </label>
                          <input
                            className="py-1 px-2 w-full border-2 rounded-sm text-md"
                            type="text"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                          />
                        </div>
                        {/* Body */}
                        <div className="flex items-center gap-x-5 mb-4">
                          <label className="text-xs uppercase-[50px]">
                            Body:
                          </label>
                          <textarea
                            className="py-1 px-2 w-full border-2 rounded-sm"
                            rows={3}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                          ></textarea>
                        </div>

                        {/* Investment Fields */}
                        <div>
                          <p className="capitalize text-xs text-gray-500 border-b-2 py-2">
                            <span className="uppercase text-black mr-2">
                              investment fields
                            </span>
                            "necessary fields cannot be removed"
                          </p>
                          <ul className="flex items-center gap-2 py-3 flex-wrap">
                            {investmentFields.map((field) => (
                              <li key={field}>
                                <button
                                  type="button"
                                  onClick={() => toggleField(field)}
                                  className={`capitalize rounded-md text-xs px-2 py-1.5 
                      ${
                        selectedFields.includes(field)
                          ? "bg-gray-400 text-white"
                          : "bg-white border text-black"
                      }`}
                                >
                                  {field}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Custom Fields */}
                        <div>
                          <p className="capitalize text-xs text-gray-500 border-b-2 py-2">
                            custom fields
                          </p>
                          <ul className="flex items-center gap-2 py-3 flex-wrap">
                            {customFields.map((field) => (
                              <li key={field}>
                                <button
                                  type="button"
                                  onClick={() => toggleField(field)}
                                  className={`capitalize rounded-md text-xs px-2 py-1.5 
                      ${
                        selectedFields.includes(field)
                          ? "bg-gray-400 text-white"
                          : "bg-white border text-black"
                      }`}
                                >
                                  {field}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Create New Fields */}
                        <div>
                          <p className="capitalize text-xs text-gray-500 border-b-2 py-2">
                            create new fields
                          </p>
                          <ul className="flex items-center gap-2 py-3 flex-wrap">
                            {newFields.map((field) => (
                              <li key={field.label}>
                                <button
                                  type="button"
                                  onClick={() => toggleField(field.label)}
                                  className="border-2 rounded-sm px-3 py-3 hover:bg-gray-200"
                                >
                                  <label className="border font-medium border-black text-black px-5 text-xs">
                                    {field.label}
                                  </label>
                                  <h6 className="capitalize rounded-md text-xs mt-2 text-center ">
                                    {field.type}
                                  </h6>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </form>
                    </div>

                    {/* Preview Section */}
                    <div className="col-span-12  md:col-span-6 lg:col-span-8 md:pl-0">
                      <div className="md:py-10 p-2 xl:px-[120px] bg-gray-600 h-[90vh] overflow-y-auto">
                        <div className="bg-white  p-3 md:p-8">
                          <div>
                            <h2 className="font-medium mb-3 text-2xl text-center">
                              {header}
                            </h2>
                            <p className="text-center text-sm text-gray-400">
                              {body}
                            </p>
                          </div>
                          {selectedFields.length > 0 && (
                            <form className="space-y-3">
                              {selectedFields.map((field) => {
                                // Default type is "text"
                                let inputType = "text";

                                // Match against newFields to get actual type
                                const matchedField = newFields.find(
                                  (f) => f.label === field
                                );
                                if (matchedField) {
                                  inputType = matchedField.type;
                                }

                                return (
                                  <div
                                    key={field}
                                    className="flex flex-col text-sm"
                                  >
                                    <label className="uppercase text-gray-500 mb-1">
                                      {field.includes("first name") ||
                                      field.includes("last name") ||
                                      field.includes("phone") ? (
                                        field + ""+"*"
                                      ) : field}
                                    </label>

                                    {/* Render according to type */}
                                    {inputType === "textarea" ? (
                                      <textarea
                                        className="border rounded px-2 py-1"
                                        placeholder={`Enter ${field}`}
                                        rows={3}
                                      />
                                    ) : inputType === "radio" ? (
                                      <div className="flex gap-3">
                                        <label>
                                          <input type="radio" name={field} />{" "}
                                          Yes
                                        </label>
                                        <label>
                                          <input type="radio" name={field} /> No
                                        </label>
                                      </div>
                                    ) : inputType === "checkbox" ? (
                                      <div className="flex gap-3">
                                        <label>
                                          <input type="checkbox" name={field} />{" "}
                                          Option 1
                                        </label>
                                        <label>
                                          <input type="checkbox" name={field} />{" "}
                                          Option 2
                                        </label>
                                      </div>
                                    ) : (
                                      <input
                                        type={inputType}
                                        className="border rounded px-2 py-1"
                                        placeholder={`Enter ${field}`}
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Main>
      </div>
    </div>
  );
}
