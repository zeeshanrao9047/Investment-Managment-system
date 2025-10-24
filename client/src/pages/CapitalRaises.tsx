import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import CapitalRaisesStep2 from "@/components/capital-Raises/CapitalRaisesStep2";

interface CapitalRaise {
  id: string;
  status: string;
  name: string;
  targetAmount?: string;
  totalFunds?: string;
  type: "DRAFT" | "CLOSED" | "ACTIVE";
}

const CapitalRaises: React.FC = () => {
  const [showStep2, setShowStep2] = useState(false);

  const capitalRaises: CapitalRaise[] = [
    {
      id: "1",
      status: "DRAFT",
      name: "Bankers Hill Fund II",
      targetAmount: "$5,000,000.00",
      type: "DRAFT",
    },
    {
      id: "2",
      status: "CLOSED",
      name: "503 B",
      totalFunds: "$230,019.00",
      type: "CLOSED",
    },
    {
      id: "3",
      status: "ACTIVE",
      name: "Orlando Multi Family",
      totalFunds: "$0.00",
      type: "ACTIVE",
    },
    {
      id: "4",
      status: "ACTIVE",
      name: "Orlando Rentals Multi-class 506b",
      totalFunds: "$274,610.00",
      type: "ACTIVE",
    },
    {
      id: "5",
      status: "ACTIVE",
      name: "Crown Point",
      totalFunds: "$0.00",
      type: "ACTIVE",
    },
  ];

  if (showStep2) {
    return (
      <div className="block md:flex">
        <Sidebar />
        <div className="w-full">
          <Header value="Capital Raises" />
          <main className="p-6 mt-[65px] lg:mt-0 bg-gray-50 min-h-screen">
            <CapitalRaisesStep2 />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="block md:flex">
      <Sidebar />
      <div className="w-full">
        <Header value="Capital Raises" />
        <main className="p-6 mt-[65px] lg:mt-0 bg-gray-50 min-h-screen transition-all duration-300">
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-6 border-cyan-700">
            <select className="border-4 border-cyan-700 rounded-md text-sm px-3 py-2">
              <option>All</option>
              <option>Active</option>
              <option>Closed</option>
            </select>

            <div className="flex items-center space-x-2 ">
              <button className="bg-gray-100 px-4 py-2 rounded-md border text-sm text-cyan-500 border-blue-500">
                Gallery
              </button>
              <button className="bg-gray-100 px-4 py-2 rounded-md border text-sm text-cyan-600 border-blue-500">
                Grid
              </button>
              <button
                onClick={() => setShowStep2(true)}
                className="bg-blue-600 hover:bg-blue-700  text-white px-4 py-2 rounded-md font-medium text-sm"
              >
                + New Capital Raise
              </button>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {capitalRaises.map((raise) => (
              <div
                key={raise.id}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-md font-bold text-white ${
                          raise.type === "DRAFT"
                            ? "bg-blue-600"
                            : raise.type === "CLOSED"
                            ? "bg-gray-400"
                            : "bg-green-600"
                        }`}
                      >
                        {raise.name.substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {raise.name}
                        </h3>
                        <p className="text-sm text-gray-500">{raise.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {raise.targetAmount ? (
                      <>
                        <div className="text-sm text-gray-500">
                          Target Amount
                        </div>
                        <div className="font-semibold text-gray-900">
                          {raise.targetAmount}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-gray-500">
                          Total Funds Received
                        </div>
                        <div className="font-semibold text-gray-900">
                          {raise.totalFunds}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 ${
                      raise.type === "DRAFT"
                        ? "bg-blue-600"
                        : raise.type === "CLOSED"
                        ? "bg-gray-400"
                        : "bg-green-600"
                    }`}
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CapitalRaises;
