import { useContext, useState } from "react";
import { useLocation } from "wouter";
import { LogOut, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { MdOutlineSegment } from "react-icons/md";
import { CommonContext } from "../../context/Contextprovider";
import { IoSettingsOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";

type HeaderProps = {
  value: string;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
};

const Header: React.FC<HeaderProps> = ({ value, showFavorite = false, isFavorite = false, onFavoriteToggle }) => {
  const [, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/auth");
      },
    });
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("CommonContext must be used inside ContextProvider");
  }

  const { setMobilemenu } = context;

  const handlemobilemenu = () => {
    setMobilemenu((prev) => !prev);
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="border-b border-1 fixed z-10 lg:static bg-white w-full top-0 ">
      <div className="w-full flex h-16 items-center justify-between py-4 pl-3 md:pl-6 lg:pl-6 pr-4 gap-3">
        {/* Mobile menu button */}
     <div className="flex gap-2 items-center">
          <button className="block lg:hidden">
            <MdOutlineSegment
              onClick={handlemobilemenu}
              className="text-4xl text-[#95D7E1]"
            />
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-md sm:text-2xl font-medium capitalize">{value}</h1>
            {showFavorite && (
              <button
                onClick={onFavoriteToggle}
                className="hover:scale-110 transition-transform"
                aria-label="Toggle favorite"
              >
                <Star
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isFavorite
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400 hover:text-yellow-400'
                  }`}
                />
              </button>
            )}
          </div>
     </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <DropdownMenu
            open={activeMenu === "search"}
            onOpenChange={() => toggleMenu("search")}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => toggleMenu("search")}
              >
                <CiSearch className="text-xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          
          <div className="hidden">
            <DropdownMenu
              open={activeMenu === "settings"}
              onOpenChange={() => toggleMenu("settings")}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => toggleMenu("settings")}
                >
                  <IoSettingsOutline className="text-sm md:text-lg" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Notifications */}
          <DropdownMenu
            open={activeMenu === "notifications"}
            onOpenChange={() => toggleMenu("notifications")}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => toggleMenu("notifications")}
              >
                <IoIosNotifications className="text-lg" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar */}
          <DropdownMenu
            open={activeMenu === "avatar"}
            onOpenChange={() => toggleMenu("avatar")}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-2 text-sm"
                onClick={() => toggleMenu("avatar")}
              >
                <Avatar>
                  <AvatarImage src={user?.avatarUrl || undefined} />
                  <AvatarFallback className="text-primary text-sm">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSettings}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
