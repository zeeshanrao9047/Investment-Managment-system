import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Reportscard from "@/components/reports/Reportscard";
import { CommonContext } from "@/context/Contextprovider";
import { useContext } from "react";
import CapitalRaisesCards from "@/components/capital-Raises/CapitalRaisesCards";

interface Capital {
    title: string
    fund: string

}

const capitalData: Capital[] = [
    {
        title: "goSTOPS",
        fund: "Total Fund Received $52,800.00",
    },
    {
        title: "Tax Reports",
        fund: "Total Fund Received $60,800.00",
    },
    {
        title: "Investment Reports",
        fund: "Total Fund Received $20,800.00",
    },
    {
        title: "Profit & Loss",
        fund: "Total Fund Received $92,500.00",
    },
    {
        title: "Balance Sheet",
        fund: "Total Fund Received $55,900.00",
    },
    {
        title: "Cash Flow",
        fund: "Total Fund Received $89,200.00",
    },
    {
        title: "Quarterly Report",
        fund: "Total Fund Received $30,235.00",
    },
    {
        title: "Annual Report",
        fund: "Complete yearly performance data",
    },
    {
        title: "Portfolio Report",
        fund: "Total Fund Received $29,600.00",
    },
    {
        title: "Custom Report",
        fund: "Total Fund Received $67,805.00",
    },
]


export default function CapitalRaises() {
    const heading = "Capital Raises";
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
                    <form className="max-w-sm mb-5 ">
                        <select id="countries" className="w-56 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>All</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                        </select>
                    </form>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-5">
                        {capitalData.map((capital, index) => (
                            <CapitalRaisesCards
                                key={index}
                                title={capital.title}
                                fund={capital.fund}
                            />
                        ))}
                       
                    </div>
                </main>
            </div>
        </div>
    );
}
