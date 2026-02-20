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
    <nav className="flex justify-between py-4 px-12 items-center bg-(--bg) shadow-md">
      <h1 className="text-2xl font-semibold">Where in the world? </h1>
      <div className="flex items-center space-x-2">
        <button onClick={toggleMode} className="">
          {isDarkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
        </button>
        <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>
    </nav>
  );
};

export default Navbar;
