import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../utils/ThemeUtils";
import { logout, updateSearchQuery } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../api/supabase";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const searchQuery = useSelector((state: any) => state.auth.currentUser?.search_query);
  const user = useSelector((state: any) => state.auth.currentUser);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
        return;
      }

      dispatch(logout());
      enqueueSnackbar("Logged out successfully!", { variant: "success" });
      navigate("/login", { replace: true });
    } catch (error) {
      enqueueSnackbar("Failed to logout. Please try again.", { variant: "error" });
    }
  };

  return (
    <nav className="relative flex items-center w-full py-6 bg-bg-primary px-4 sm:px-6 lg:px-8 dark:bg-gray-500">
      {/* left */}
      <div className="flex items-center gap-2 sm:gap-4">
        <img src="./logos/Vector.svg" alt="Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
        <span className="text-lg sm:text-xl font-bold text-white">Amorphic</span>
      </div>

      {/* center: search bar */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1/3">
        <div className="relative w-[80%]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <img src="./logos/search.svg" alt="Search" className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Start search here..."
            value={searchQuery}
            onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-1.5 rounded-md border border-zinc-300  bg-white  text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"  />
        </div>
      </div>

      {/* right */}
      <div className="flex items-center gap-2 sm:gap-8 ml-auto relative">
        <ThemeToggle />

        {/* Profile Icon */}
        <div className="relative">
          <img src={user?.profile_picture || "./logos/user.svg"} alt="profile"
            className="h-10 w-10 p-0.5 bg-white rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)} />

          {/* Dropdown */}
         {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-border-third rounded-lg p-2 space-y-2 shadow-lg z-50">    
            <button className="flex cursor-pointer items-center gap-6 w-full text-left border border-border-third px-4 py-2 rounded-md hover:bg-gray-100 shadow-md"
              onClick={() => {
                navigate("/settings");
                setDropdownOpen(false); }}>
              <img src="./logos/settings.svg" alt="settings" className="w-4 h-4" />
              Settings
            </button>

            <button className="flex cursor-pointer items-center gap-6 w-full text-left border border-border-third px-4 py-2 rounded-md hover:bg-gray-100 shadow-md" onClick={handleLogout}>
              <img src="./logos/logout.svg" alt="logout" className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
