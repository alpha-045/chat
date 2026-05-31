import { Link, LogOut, MessageCircle, Settings, UserPen } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Links } from "react-router-dom";

const Navbar = () => {
  const { authUser, logOut } = useAuthStore();

  const handleLogout = () => {
    logOut();
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  return (
    <div className="bg-white px-4 py-2 shadow-md shadow-purple-200/50 rounded-md flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="url(#gradient)"
            className="w-8 h-8 transition-transform group-hover:scale-105"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#a855f7" }} />
                <stop offset="100%" style={{ stopColor: "#d946ef" }} />
              </linearGradient>
            </defs>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.11.62 4.07 1.71 5.75L2 22l4.25-1.71C7.93 21.38 9.89 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.88 0-3.61-.62-5-1.68l-2.02.81.81-2.02C5.62 15.61 5 13.88 5 12c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7z" />
            <circle cx="8" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="16" cy="12" r="1.5" />
          </svg>
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          ChatWave
        </span>
      </div>

      <div className="flex items-center gap-2">
       

        {authUser && (
          <>
            {" "}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 font-semibold rounded-full text-gray-700 hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white transition-all ease-linear duration-200 group"
            >
              <LogOut />
              Logout
            </button>
            <a
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 font-semibold rounded-full text-gray-700 hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white transition-all ease-linear duration-200 group"
            >
              <UserPen />
              profile
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
