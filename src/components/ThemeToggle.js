// src/components/ThemeToggle.js

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`relative inline-flex items-center transition duration-300 ease-in-out w-14 h-8 rounded-full p-1
          ${isDarkMode ? "bg-gray-300" : "bg-gray-300"}`}
      >
        <span
          className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow-md transform bg-white flex items-center justify-center text-yellow-400 text-sm
            transition-transform duration-300 ease-in-out
            ${isDarkMode ? "translate-x-6" : "translate-x-0"}`}
        >
          {isDarkMode ? <FaMoon className="text-xs text-gray-800" /> : <FaSun className="text-xs text-yellow-500" />}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
