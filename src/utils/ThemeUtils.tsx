import { FaSun, FaMoon } from 'react-icons/fa'
import React, { useState } from 'react'
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
const { theme , toggleTheme } = useTheme()


  return (
    <div>
      <button  onClick={toggleTheme}  className="px-2 py-2 rounded-full cursor-pointer bg-white text-black  transition-colors">
        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </div>
  )
}

export default ThemeToggle