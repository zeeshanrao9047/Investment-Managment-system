import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { CommonContext } from "@/context/Contextprovider";
import { useContext, useState } from "react";
import Main from "@/components/layout/Main";
import Card from "@/components/projectspagecomponents/Card";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
} from "recharts";
const carddata = [
  { title: "total capital balance", price: 1329800000 },
  { title: "total distributions", price: 0 },
  { title: "stakeholders", price: 30 },
];
const data = [
  {price: 400, volume: 2400 },
  {price: 300, volume: 1398 },
  {price: 200, volume: 9800 },
  {price: 278, volume: 3908 },
  {price: 189, volume: 4800 },
  {price: 200, volume: 9800 },
  {price: 278, volume: 3908 },
  {price: 189, volume: 4800 },
];

export default function Projectdetail() {
  const heading = "vuvp fund i";
  const [activeTab, setActiveTab] = useState("tab1");
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
          <div>
            {/* Tab Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap pb-5 border-b-2 border-gray-200 font-xs">
                <button
                  onClick={() => setActiveTab("tab1")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab1"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  overview
                </button>
                <button
                  onClick={() => setActiveTab("tab2")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab2"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  transactions
                </button>
                <button
                  onClick={() => setActiveTab("tab3")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab3"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  positions
                </button>
                <button
                  onClick={() => setActiveTab("tab4")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab4"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  commitments
                </button>
                <button
                  onClick={() => setActiveTab("tab5")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab5"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  capital calls
                </button>
                <button
                  onClick={() => setActiveTab("tab6")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab6"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  distributions
                </button>
                <button
                  onClick={() => setActiveTab("tab7")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab7"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  classes
                </button>
                <button
                  onClick={() => setActiveTab("tab8")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab8"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  documents
                </button>
                <button
                  onClick={() => setActiveTab("tab9")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab9"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  assests
                </button>
                <button
                  onClick={() => setActiveTab("tab10")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab10"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  payments
                </button>
                <button
                  onClick={() => setActiveTab("tab11")}
                  className={`capitalize px-4 py-2 text-sm font-medium ${
                    activeTab === "tab11"
                      ? "border-b-2 border-[#95D7E1] text-[#95D7E1]"
                      : "text-gray-600 hover:text-[#95D7E1]"
                  }`}
                >
                  settings
                </button>
              </div>
            </div>
            {/* Tab Content */}
            <div className="pt-[20px]">
              {activeTab === "tab1" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {carddata.map((item, index) => (
                      <div className="col-span-1">
                        <Card
                          key={index}
                          title={item.title}
                          price={item.price}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-5">
                    <div className="border-2 rounded-md w-full   shadow-md">
                      <h2 className="text-lg font-semibold mb-3 capitalize border-b-2 py-2 px-4">
                        capital stack
                      </h2>
                      <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          {/* Volume */}
                          <Bar dataKey="volume" barSize={30} fill="#95D7E1" />
                          {/* Price Line */}
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#95D7E1"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="border-2 rounded-md w-full   shadow-md">
                      <h2 className="text-lg font-semibold mb-3 capitalize border-b-2 py-2 px-4">
                        recent distributions
                      </h2>

                      <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          {/* Volume */}
                          <Bar dataKey="volume" barSize={30} fill="#95D7E1" />
                          {/* Price Line */}
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#95D7E1"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "tab2" && <p>Content for Tab 2</p>}
              {activeTab === "tab3" && <p>Content for Tab 3</p>}
              {activeTab === "tab4" && <p>Content for Tab 4</p>}
              {activeTab === "tab5" && <p>Content for Tab 5</p>}
              {activeTab === "tab6" && <p>Content for Tab 6</p>}
              {activeTab === "tab7" && <p>Content for Tab 7</p>}
              {activeTab === "tab8" && <p>Content for Tab 8</p>}
              {activeTab === "tab9" && <p>Content for Tab 9</p>}
              {activeTab === "tab10" && <p>Content for Tab 10</p>}
              {activeTab === "tab11" && <p>Content for Tab 11</p>}
            </div>
          </div>
        </Main>
      </div>
    </div>
  );
}
