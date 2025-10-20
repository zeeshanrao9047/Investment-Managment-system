import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";
import { Link } from "wouter";

export default function Contactus() {
  const heading = "Contacts";
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full overflow-x-auto">
          <Header value={heading} />
          <Main>
            <div className="block md:flex items-center justify-between gap-6 pb-6">
              <form className="max-w-xs w-full">
                <select
                  id="countries"
                  className="w-56 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>All Contacts</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </form>
              <div className="flex items-center gap-4 justify-center lg:justify-end mt-5 lg:mt-0">
                <button className="border-1 px-4 py-2 text-[#3b60e6] bg-[#95D7E1] capitalize rounded-sm">
                  export
                </button>
                <button className="border-1 px-4 py-2 text-[#3b60e6] bg-[#95D7E1] capitalize rounded-sm">
                  filter
                </button>
              </div>
            </div>
            <div>
              <div className="border-2 relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                      {/* Checkbox column */}
                      <th scope="col" className="px-4 py-3">
                        <input type="checkbox" />
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        Tags
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        Portal Status
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        Warnings
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        Active
                      </th>
                    </tr>
                    <tr>
                      {/* Checkbox search row empty */}
                      <th className="px-4 py-2"></th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search Name"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search Tags"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search Email"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search Status"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search Warnings"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2">
                        <input
                          type="text"
                          placeholder="Search Active"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                      {/* Checkbox cell */}
                      <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[50px] max-w-[50px] break-words">
                        <input type="checkbox" />
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                        <Link to="/contactsdetail">apple</Link>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                        <ul className="grid grid-cols-2 flex-wrap gap-3">
                          <li className="w-fit">
                            <span className="px-3 py-1.5 bg-blue-700 font-medium text-white rounded-full leading-0">
                              wwe
                            </span>
                          </li>
                          <li className="w-fit">
                            <span className="px-3 py-1.5 bg-blue-700 font-medium text-white rounded-full leading-0">
                              tag
                            </span>
                          </li>
                        </ul>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                        zeedev@gmail.com
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                        <span className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                          Registered
                        </span>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                        <span className="mx-auto w-fit flex flex-row text-xs md:text-[14px] px-2 md:px-5 py-1 bg-yellow-500 text-black rounded-full capitalize">
                          missing linked
                        </span>
                      </td>
                      <td>
                        <span className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                          yes
                        </span>
                      </td>
                    </tr>

                    {/* Repeat same structure for other rows */}
                  </tbody>
                </table>
              </div>
            </div>
          </Main>
        </div>
      </div>
    </>
  );
}
