import React, { useEffect } from "react";
import { useState } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="  bg-(--bg) text-(--text) shadow-md">
      <div className="container mx-auto px-4 flex justify-between py-4 md:px-8 lg:px-12 items-center">
        <h1 className="text-2xl font-semibold">Where in the world? </h1>
        <div className="flex items-center space-x-2">
          <button onClick={toggleMode} className="">
            {isDarkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
          </button>
          <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
