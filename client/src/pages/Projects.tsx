import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";
import { Link } from "wouter";

export default function Projects() {
  const heading = "Projects";
  return (
    <>
      <div className="block md:flex">
        <Sidebar />
        <div className="w-full overflow-x-auto">
          <Header value={heading} />
          <main className="max-w-full p-3 md:p-5 mt-[65px] lg:mt-0 transition-all duration-100 ease-in-out">
            <div className="block md:flex items-center justify-between gap-6 pb-6">
              <form className="max-w-xs w-full">
                <select
                  id="countries"
                  className="w-56 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>All projects</option>
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
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  <thead className="text-xs text-gray-700 uppercase overflow-x-auto">
                    <tr>
                      <th scope="col" className="px-6 py-3 capitalize">
                        name
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        stage
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        country
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        currency
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        days since first contributations
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        stakeholder
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        payments accounts
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        capital balance
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        contributations
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        distributations
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                        accured investments
                      </th>
                    </tr>

                    {/* Search row */}
                    <tr className="bg-white dark:bg-gray-800">
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search name"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search accounts"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search balance"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search contributations"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search distributions"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search accrued"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search accrued"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search contributations"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search distributions"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
                        <input
                          type="text"
                          placeholder="Search accrued"
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                        />
                      </th>
                      <th className="px-6 py-2 ">
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
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <Link to="/projectdetail">apple</Link>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        zeeshan@gmail.com
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                    </tr>
                    <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                      <td className="px-2 md:px-6 py-2.5 md:py-4  break-words">
                        <Link to="/contactsdetail">apple</Link>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        zeeshan@gmail.com
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                    </tr>
                    <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                      <td className="px-2 md:px-6 py-2.5 md:py-4  break-words font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Link to="/contactsdetail">apple</Link>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        zeeshan@gmail.com
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                    </tr>
                    <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                      <td className="px-2 md:px-6 py-2.5 md:py-4  break-words font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Link to="/contactsdetail">apple</Link>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        zeeshan@gmail.com
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                    </tr>
                    <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                      <td className="px-2 md:px-6 py-2.5 md:py-4  break-words font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Link to="/contactsdetail">apple</Link>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        zeeshan@gmail.com
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                    </tr>
                    <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                      <td className="px-2 md:px-6 py-2.5 md:py-4  break-words font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Link to="/contactsdetail">apple</Link>
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        zeeshan@gmail.com
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                      <td className="px-2 md:px-6 py-2.5 md:py-4 break-words">
                        <span>$</span>2000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
