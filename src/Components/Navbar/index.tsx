import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../utils/ThemeUtils";
import { logout, updateSearchQuery , updateLanguagePreference} from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../api/supabase";
import { useSnackbar } from "notistack";
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()

  
  const { enqueueSnackbar } = useSnackbar();
  const searchQuery = useSelector((state: any) => state.auth.currentUser?.search_query);
  const user = useSelector((state: any) => state.auth.currentUser);


  const { t } = useTranslation();
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
    <nav className="relative flex items-center w-full py-4 md:py-6 bg-bg-primary   px-4 sm:px-6 lg:px-8 ">
      {/* left */}
      <Link to="/">
        <div  className="flex items-center gap-2  sm:gap-4">
          <img src="./logos/Vector.svg" alt="Logo" className="h-5 w-5  sm:h-6 sm:w-6 md:h-8 md:w-8" />
          <span className="text-md sm:text-lg md:text-xl font-bold text-white">{t("amorphic")}</span>
        </div>
      </Link> 

      {/* center: search bar */}
      {location.pathname ==='/' && (
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1/3">
          <div className="relative w-[80%]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <img src="./logos/search.svg" alt="Search" className="h-5 w-5" />
            </span>
            <input 
              type="text"
              placeholder={t("search_text")}
              value={searchQuery}
              onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-1.5 rounded-md border border-zinc-300  bg-white  text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"  />
              {searchQuery && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2  hover:text-zinc-700 dark:hover:text-black bg-bg-primary rounded-full px-1.5 opacity-50 " onClick={()=>dispatch(updateSearchQuery(""))}>✕</button>
              )}
          </div>
        </div>
      )}
      
      {/* right */}
      <div className="flex items-center gap-4 sm:gap-8 ml-auto relative">
        <button onClick={()=>dispatch(updateLanguagePreference('eng'))}>eng</button>
        <button onClick={()=>dispatch(updateLanguagePreference('arb'))}>arb</button>
        <ThemeToggle />

        {/* Profile Icon */}
        <div className="relative">
          <img src={user?.profile_picture || "./logos/user.svg"} alt="profile"
            className="h-10 w-10 p-0.5 bg-white rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)} />

          {/* Dropdown */}
         {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-34 md:w-40 lg:w-44 bg-white dark:bg-neutral-800 border border-border-third dark:border-neutral-500 rounded-lg p-1 md:p-2 space-y-1 md:space-y-2 shadow-lg z-50">    
            <button className="flex cursor-pointer items-center gap-3 md:gap-6 w-full text-left border border-border-third dark:border-neutral-500 px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-500 shadow-md"
              onClick={() => {
                navigate("/settings");
                setDropdownOpen(false); }}>
              <img src="./logos/settings.svg" alt="settings" className="w-4 h-4" />
              {t("settings_btn")}
            </button>

            <button className="flex cursor-pointer items-center gap-3 md:gap-6 w-full text-left border border-border-third dark:border-neutral-500 px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-500 shadow-md" onClick={handleLogout}>
              <img src="./logos/logout.svg" alt="logout" className="w-4 h-4 " />
              {t("logout_btn")}
            </button>
          </div>
        )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
