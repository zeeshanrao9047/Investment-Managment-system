import { Home, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useContext, useState, useRef, useEffect } from "react"; // UPDATED
import { MdOutlineSegment } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { GiRaiseSkeleton } from "react-icons/gi";
import { IoTrophyOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { GrTask } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { CommonContext } from "../../context/Contextprovider";
import { PiSignature } from "react-icons/pi";
import logo from "../../../public/assets/finally-logo.png";

const Sidebar = () => {
  const [location, navigate] = useLocation();
  const context = useContext(CommonContext);

  if (!context) {
    throw new Error("CommonContext must be used inside ContextProvider");
  }

  const { sidemenu, setSidemenu } = context;
  const { mobilemenu, setMobilemenu } = context;

  const sidebarRef = useRef(null); // NEW

  const handlemenu = () => {
    setSidemenu((prev) => !prev);
  };

  const handlemobilemenu = () => {
    setMobilemenu((prev) => !prev);
  };

  // ✅ Helper for link clicks (close in mobile view)
  const handleLinkClick = (path) => {
    navigate(path);
    setMobilemenu(false);
  };

  // ✅ Close sidebar on outside click (only in mobile view)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobilemenu &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setMobilemenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobilemenu, setMobilemenu]);

  // ✅ Force sidemenu expanded on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidemenu(true);   // mobile → always expanded
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidemenu]);


  return (
    <div
      ref={sidebarRef} // NEW
      className={`
    border-r bg-white px-4 transition-all duration-300 ease-in-out
    ${mobilemenu
          ? "translate-x-0 w-[235px]"
          : "-translate-x-full lg:translate-x-0 w-[235px]"
        }
    ${sidemenu ? "lg:w-[240px]" : "lg:w-[120px]"}
    fixed lg:sticky top-0 left-0 h-full z-50
  `}
    >
      <div className="flex items-center justify-between pt-2 pb-4">
        <Link to="/dashboard">
          <img
            className={`${sidemenu
              ? "w-[100px] transition-all duration-500 ease-in-out"
              : "w-[60px] transition-all duration-500 ease-in-out"
              }`}
            src={logo}
            alt="site-logo"
            loading="lazy"
          />
        </Link>
        <button className="hidden lg:block" onClick={handlemenu}>
          <MdOutlineSegment className="text-4xl text-[#95D7E1]" />
        </button>
        <button className="block lg:hidden" onClick={handlemobilemenu}>
          <MdOutlineSegment className="text-4xl text-[#95D7E1]" />
        </button>
      </div>

      <div className="flex flex-col gap-y-3 h-[85vh] pt-4 overflow-y-auto overflow-x-hidden no-scrollbar">

        {/* Dashboard */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/dashboard"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/dashboard")} // UPDATED
          >
            {sidemenu ? (
              <>
                <Home className="h-5 w-5 mr-4" />
                <span className="">Dashboard</span>
              </>
            ) : (
              <Home className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        {/* Projects */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/projects"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/projects")} // UPDATED
          >
            {sidemenu ? (
              <>
                <GoProjectSymlink className="h-5 w-5 mr-4" />
                <span className="">Projects</span>
              </>
            ) : (
              <GoProjectSymlink className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        {/* Capital Raises */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/capitalraises"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/capitalraises")} // UPDATED
          >
            {sidemenu ? (
              <>
                <GiRaiseSkeleton className="h-5 w-5 mr-4" />
                <span className="">Capital Raises</span>
              </>
            ) : (
              <GiRaiseSkeleton className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        <hr />

        {/* Contact */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/contact"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/contact")} // UPDATED
          >
            {sidemenu ? (
              <>
                <RiContactsBook2Line className="h-5 w-5 mr-4" />
                <span className="">Contact</span>
              </>
            ) : (
              <RiContactsBook2Line className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        {/* Accounts */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/accounts"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/accounts")} // UPDATED
          >
            {sidemenu ? (
              <>
                <MdOutlineManageAccounts className="h-5 w-5 mr-4" />
                <span className="capitalize">accounts</span>
              </>
            ) : (
              <MdOutlineManageAccounts className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        {/* Communications */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/communications"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/communications")} // UPDATED
          >
            {sidemenu ? (
              <>
                <MdOutlineChatBubbleOutline className="h-5 w-5 mr-4" />
                <span className="capitalize">communications</span>
              </>
            ) : (
              <MdOutlineChatBubbleOutline className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        <hr />

        {/* Tasks */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/tasks"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/tasks")} // UPDATED
          >
            {sidemenu ? (
              <>
                <GrTask className="h-5 w-5 mr-4" />
                <span className="capitalize">tasks</span>
              </>
            ) : (
              <GrTask className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        {/* Signature */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/signature"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/signature")} // UPDATED
          >
            {sidemenu ? (
              <>
                <PiSignature className="h-5 w-5 mr-4" />
                <span className="capitalize">E-signature</span>
              </>
            ) : (
              <PiSignature className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        {/* Reports */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/reports"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/reports")} // UPDATED
          >
            {sidemenu ? (
              <>
                <TbReportSearch className="h-5 w-5 mr-4" />
                <span className="capitalize">report</span>
              </>
            ) : (
              <TbReportSearch className="h-5 w-5 mx-auto" />
            )}
          </Button>
        </div>

        {/* Statements */}
        <div className="flex justify-center">
          <Button
            className={`${sidemenu
              ? "inline-flex items-center justify-start w-full"
              : "inline-flex justify-center w-fit"
              } ${location === "/statement"
                ? "bg-[#95D7E1] text-[#3b60e6]"
                : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
              }`}
            onClick={() => handleLinkClick("/statement")} // UPDATED
          >
            {sidemenu ? (
              <>
                <TbFileInvoice className="h-5 w-5 mr-4" />
                <span className="">
                  Statements{" "}
                  <span className="px-4  py-1 bg-[#2046cc] text-white rounded-full">
                    Beta
                  </span>
                </span>
              </>
            ) : (
              <>
                <div className="relative w-fit">
                  <TbFileInvoice className=" h-5 w-5 mx-auto" />
                  <h1 className="top-0 -right-2 absolute w-2 h-2 bg-[#2046cc] text-white rounded-full"></h1>
                </div>
              </>
            )}
          </Button>
        </div>

        <hr />

        {/* Settings / Reference Program */}
        <div className="relative h-fit">
          <div className="absolute bottom-0 left-0 right-0  py-4 border-t bg-white">
            <Button
              className={`${sidemenu
                ? "inline-flex items-center justify-start w-full"
                : "inline-flex justify-center w-full"
                } ${location === "/settings"
                  ? "bg-[#95D7E1] text-[#3b60e6]"
                  : "hover:bg-[#95D7E1] hover:text-[#3b60e6]"
                }`}
              onClick={() => handleLinkClick("/settings")} // UPDATED
            >
              {sidemenu ? (
                <>
                  <IoTrophyOutline className="h-5 w-5 mr-3" />
                  <span className="capitalize">Reference program</span>
                </>
              ) : (
                <IoTrophyOutline className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
