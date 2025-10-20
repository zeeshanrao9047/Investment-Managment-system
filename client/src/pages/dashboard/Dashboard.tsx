import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { CommonContext } from "@/context/Contextprovider";
import { useContext } from "react";
import Cards from "../../components/dashboardcomponents/Cards";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Main from "@/components/layout/Main";

const data = [
  {
    id: 1,
    title: "funds under management",
    price: 201168156.97,
  },
  {
    id: 2,
    title: "total distributions pait out",
    price: 10675012,
  },
  {
    id: 3,
    title: "active investors",
    price: 2211,
  },
];
export default function Dashboard() {
  const heading = "Dashboard";
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-center">
            {data.map((carddata , _) => (
              <div>
                <Cards title={carddata.title} price={carddata.price} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            <div className=" border-2 actice-items-card p-3 sm:p-5 shadow-custom rounded-md">
              <h1 className="border-b-2 border-gray-200 pb-3 font-medium">Active items</h1>
              <div className="px-0 sm:px-3 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 w-fit rounded-md flex items-center bg-[#3b60e6] text-[#eff2f8]">
                    <FaPencilAlt className="" />
                  </span>
                  <h5 className="capitalize leading-5 font-medium text-sm">
                    countersignature <br /> needed
                  </h5>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="inline-block w-7 h-7 pt-1 text-center text-sm text-white font-medium bg-red-500 rounded-full">
                        58
                      </span>
                      <FaRegArrowAltCircleRight className="text-lg" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-0 sm:px-3 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 w-fit rounded-md flex items-center bg-[#3b60e6] text-[#eff2f8]">
                    <FaPencilAlt className="" />
                  </span>
                  <h5 className="capitalize leading-5 font-medium text-sm">
                    Review Accreditation
                  </h5>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="inline-block w-7 h-7 pt-1 text-center text-sm text-white font-medium bg-red-500 rounded-full">
                        2
                      </span>
                      <FaRegArrowAltCircleRight className="text-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Capital Raaises card start */}
            <div className=" border-2 capital-raises-card rounded-md">
              <div className="actice-items-card p-3 sm:p-5 shadow-custom rounded-md">
                <div className="flex border-b-2 border-gray-200 pb-3 justify-between items-center">
                  <h1 className="font-medium">Capital Raises</h1>
                  <a className="text-blue-500 underline text-sm" href="#">View all</a>
                </div>
                <div className="scrl-insde-sec h-[285px] overflow-y-auto mb-4">
                  <div className="px-3 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                        <h2 className="text-[#3b60e6]">St</h2>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        Statum <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">NO</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        NORTHSTAR VC SERIES 34 A SERIES OF NORTHSTAR VENTURE CAPITAL LLC <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">Ve</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        VentureUs fund ll, a series of VentureUs LLC <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                        <h2 className="text-[#3b60e6]">St</h2>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        Statum <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">NO</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        NORTHSTAR VC SERIES 34 A SERIES OF NORTHSTAR VENTURE CAPITAL LLC <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">Ve</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        VentureUs fund ll, a series of VentureUs LLC <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                        <h2 className="text-[#3b60e6]">St</h2>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        Statum <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">NO</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        NORTHSTAR VC SERIES 34 A SERIES OF NORTHSTAR VENTURE CAPITAL LLC <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">Ve</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        VentureUs fund ll, a series of VentureUs LLC <br /> <span className="text-sm font-thin">Draft</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="w-full border-2 border-[#3b60e6] py-1 rounded-sm text-sm text-[#3b60e6] font-semibold flex items-center justify-center gap-2"><FaPlus /> Add New</button>
                </div>
              </div>
            </div>
            {/* Capital Raaises card End */}

            {/* project-card card start */}
            <div className="project-card">
              <div className=" border-2 actice-items-card p-3 sm:p-5 shadow-custom rounded-sm">
                <div className="flex border-b-2 border-gray-200 pb-3 justify-between items-center">
                  <h1 className="font-medium">Projects</h1>
                  <a className="text-blue-500 underline text-sm" href="#">View all</a>
                </div>
                <div className="scrl-insde-sec h-[285px] overflow-y-auto mb-4">
                  <div className="px-3 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                        <h2 className="text-[#3b60e6]">St</h2>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        Statum <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">NO</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        NORTHSTAR VC SERIES 34 A SERIES OF NORTHSTAR VENTURE CAPITAL LLC <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">Ve</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        VentureUs fund ll, a series of VentureUs LLC <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                        <h2 className="text-[#3b60e6]">St</h2>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        Statum <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">NO</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        NORTHSTAR VC SERIES 34 A SERIES OF NORTHSTAR VENTURE CAPITAL LLC <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">Ve</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        VentureUs fund ll, a series of VentureUs LLC <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                        <h2 className="text-[#3b60e6]">St</h2>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        Statum <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">NO</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        NORTHSTAR VC SERIES 34 A SERIES OF NORTHSTAR VENTURE CAPITAL LLC <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>

                  <div className="px-3 pt-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="name-symbol bg-[#eff2f8] w-[56px] h-[56px] flex items-center justify-center font-bold rounded-sm">
                          <h2 className="text-[#3b60e6]">Ve</h2>
                        </div>
                      </div>
                      <h5 className="capitalize leading-5 font-medium text-sm">
                        VentureUs fund ll, a series of VentureUs LLC <br /> <span className="text-sm font-thin">active</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="w-full border-2 border-[#3b60e6] py-1 rounded-sm text-sm text-[#3b60e6] font-semibold flex items-center justify-center gap-2"><FaPlus /> Add New</button>
                </div>
              </div>
            </div>
            {/* project-card card End */}
          </div>
        </Main>
      </div>
    </div>
  );
}
