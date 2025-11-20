import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../utils/ThemeUtils";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { supabase } from "../../api/supabase";
import { useSnackbar } from "notistack";

const ProfileIcon = () => <img src="./logos/user.svg" alt="profile" className="h-8 w-8 rounded-full" />;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        enqueueSnackbar(error.message, { variant: "error" });
        console.error("Logout error:", error);
        return;
      }

      dispatch(logout());
      
      enqueueSnackbar("Logged out successfully!", { variant: "success" });
      
      navigate("/login", { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      enqueueSnackbar("Failed to logout. Please try again.", { variant: "error" });
    }
  };

  return (
    <nav className="relative flex items-center w-full py-8 bg-bg-primary px-8 dark:bg-gray-500">
  {/* left */}
  <div className="flex items-center gap-4">
    <img src="./logos/Vector.svg" alt="Logo" className="h-8 w-8" />
    <span className="text-xl font-bold text-white ">Amorphic</span>
  </div>

  {/* center: search bar */}
  <div className="absolute left-1/2 transform -translate-x-1/2 w-1/3">
    <div className="relative w-[80%]">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <img src="./logos/search.svg" alt="Search" className="h-5 w-5" />
      </span>
      <input
        type="text"
        placeholder="Start search here..."
        className="w-full pl-20 pr-4 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* right */}
  <div className="flex items-center gap-4 ml-auto">
    <ThemeToggle/>
    <ProfileIcon />
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
    >
      Logout
    </button>
  </div>
</nav>

  );
};

export default Navbar;
