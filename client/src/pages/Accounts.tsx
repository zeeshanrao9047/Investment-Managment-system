import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import Sidebar from "@/components/layout/Sidebar";
import React, { useRef, useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "wouter";

export default function Accounts() {
  const heading = "Accounts";
  const [activeTab, setActiveTab] = useState("tab1");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full overflow-x-auto">
          <Header value={heading} />
          <Main>
            <div>
              <div>
                <button
                  onClick={() => setActiveTab("tab1")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab1"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  accounts
                </button>
                <button
                  onClick={() => setActiveTab("tab2")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab2"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  custodians
                </button>
                <div>
                  {activeTab === "tab1" && (
                    <>
                      <div className="flex items-center gap-4 justify-center lg:justify-end pb-6">
                        <button className="border-1 px-4 py-2 text-[#3b60e6] bg-[#95D7E1] capitalize rounded-sm">
                          export
                        </button>
                      </div>
                      <div>
                        <div className="border-2 relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                          <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            <thead className="text-xs text-gray-700 uppercase">
                              <tr>
                                <th scope="col" className="px-4 py-3">
                                  <input type="checkbox" />
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 capitalize"
                                >
                                  name
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 capitalize"
                                >
                                  account number
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 capitalize"
                                >
                                  legal account type
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 capitalize"
                                >
                                  account type (by country)
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 capitalize"
                                >
                                  primary contact
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 capitalize"
                                >
                                  linked ACH account
                                </th>
                              </tr>

                              {/* Search row */}
                              <tr className="bg-white dark:bg-gray-800">
                                <th className="px-4 py-2"></th>
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
                                    placeholder="Search distributions"
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                                  />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                                <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[50px] max-w-[50px] break-words">
                                  <input type="checkbox" />
                                </td>
                                <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                                  <Link to="/projectdetail">apple</Link>
                                </td>
                                <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                                  zeeshan@gmail.com
                                </td>
                                <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                                  <span>$</span>2000
                                </td>
                                <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                                  <span>$</span>2000
                                </td>
                                <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                                  <span>$</span>2000
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "tab2" && <>
                  <p>custodians</p>
                  </>}
                </div>
              </div>
            </div>
          </Main>
        </div>
      </div>
    </>
  );
}
