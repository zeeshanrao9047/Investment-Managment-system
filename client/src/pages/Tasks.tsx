import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import Sidebar from "@/components/layout/Sidebar";
import Reportscard from "@/components/reports/Reportscard";
import { CommonContext } from "@/context/Contextprovider";
import { useContext } from "react";

export default function Tasks() {
  const heading = "Tasks";
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("CommonContext must be used inside ContextProvider");
  }

  return (
    <div className="block md:flex">
      <Sidebar />
      <div className="w-full">
        <Header value={heading} />
        <Main>
          <form className="max-w-sm mb-5 ">
            <select
              id="countries"
              className="w-56 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>view task report</option>
              <option value="FR">show my open tasks</option>
              <option value="DE">show all tasks</option>
            </select>
          </form>

          <div className="border-2 relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-sm text-center text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase">
                <tr>
                  {/* Checkbox column */}
                  <th scope="col" className="px-4 py-3">
                    <input type="checkbox" />
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    title
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    assigned to
                  </th>
                  <th scope="col" className="px-6 py-3 capitalize">
                    due date
                  </th>
                </tr>
                <tr>
                  {/* Checkbox search row empty */}
                  <th className="px-6 py-2">
                  
                  </th>
                  <th className="px-6 py-2">
                    <input
                      type="text"
                      placeholder="title"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <input
                      type="text"
                      placeholder="status"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                    />
                  </th>
                   <th className="px-6 py-2">
                    <input
                      type="text"
                      placeholder="assign to"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm"
                    />
                  </th>
                  <th className="px-6 py-2"></th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                  {/* Checkbox cell */}
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[50px] max-w-[50px] break-words">
                    <input type="checkbox" />
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    meesage from  portfolio manager to
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    overdue
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                 
                  </td>
                   <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    dec,31,2020
                  </td>
                </tr>
                 <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                  {/* Checkbox cell */}
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[50px] max-w-[50px] break-words">
                    <input type="checkbox" />
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    meesage from  portfolio manager to
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    overdue
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                 
                  </td>
                   <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    dec,31,2020
                  </td>
                </tr>
                 <tr className="border-t-2 border-b-2 hover:bg-gray-100">
                  {/* Checkbox cell */}
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[50px] max-w-[50px] break-words">
                    <input type="checkbox" />
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    meesage from  portfolio manager to
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    overdue
                  </td>
                  <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                 
                  </td>
                   <td className="px-2 md:px-6 py-2.5 md:py-4 min-w-[200px] max-w-[300px] break-words">
                    dec,31,2020
                  </td>
                </tr>

                {/* Repeat same structure for other rows */}
              </tbody>
            </table>
          </div>
        </Main>
      </div>
    </div>
  );
}
