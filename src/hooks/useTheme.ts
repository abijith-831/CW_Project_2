import { useEffect, useState } from "react";
import { updateThemePreference } from "../redux/slices/authSlice";
import { useDispatch , useSelector } from "react-redux";

export const useTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state:any)=> state.auth.currentUser?.theme_preference) || 'light';

  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    dispatch(updateThemePreference(newTheme))
  };

  return { theme, toggleTheme };
}
