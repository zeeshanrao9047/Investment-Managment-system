import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Reportscard from "@/components/reports/Reportscard";
import { CommonContext } from "@/context/Contextprovider";
import { useContext } from "react";

interface Report {
    title: string
    description: string

}

const reportsData: Report[] = [
    {
        title: "Dividend Reports",
        description: "Report on all dividend with exdate calendar year",
    },
    {
        title: "Tax Reports",
        description: "All reports related to tax summaries",
    },
    {
        title: "Investment Reports",
        description: "Track your investment performance",
    },
    {
        title: "Profit & Loss",
        description: "Monthly profit and loss details",
    },
    {
        title: "Balance Sheet",
        description: "Company’s financial position at a glance",
    },
    {
        title: "Cash Flow",
        description: "Monitor cash inflows and outflows",
    },
    {
        title: "Quarterly Report",
        description: "All quarterly updates for investors",
    },
    {
        title: "Annual Report",
        description: "Complete yearly performance data",
    },
    {
        title: "Portfolio Report",
        description: "Summary of all assets in portfolio",
    },
    {
        title: "Custom Report",
        description: "Create your own customized report",
    },
]
export default function Reports() {
    const heading = "Reports";
    const context = useContext(CommonContext);
    if (!context) {
        throw new Error("CommonContext must be used inside ContextProvider");
    }

    return (
        <div className="block md:flex">
            <Sidebar />
            <div className="w-full">
                <Header value={heading} />
                <main className="max-w-full p-3 md:p-5 mt-[65px] lg:mt-0 transition-all duration-100 ease-in-out">
                    <div className="alert-sec mb-4 ">
                        <div id="toast-warning" className="relative flex items-start md:items-center w-full px-4 py-2 text-gray-500 bg-[#e1e3f7] rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                              <div className="mt-1 md:mt-0">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                                </svg>
                                <span className="sr-only">Warning icon</span>
                              </div>
                          
                            <div className="ms-3">
                                <h4 className="text-[#5b659b] font-bold">How Can We Improve Our Reporting Experience?</h4>
                                <p className=" text-md font-normal text-[#5b659b]">Please provide feedback on your experience with our reporting features</p>
                            </div>
                            <button type="button" className="ms-auto absolute top-[15px] right-[15px] md:static -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <h4 className="mb-4 font-bold">Project Reports</h4>
                    <form className="max-w-lg mb-5 shadow-custom rounded-sm">
                        <select id="countries" className="block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Select a project to on...</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {reportsData.map((report, index) => (
                            <Reportscard
                                key={index}
                                title={report.title}
                                description={report.description}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
