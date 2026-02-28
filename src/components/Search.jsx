import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const Search = ({ search, setSearch, region, setRegion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <section className="py-12 md:py-16 flex md:items-center flex-col md:flex-row justify-between gap-10">
      <div className="flex items-center relative  w-full md:w-[40%] ">
        <IoIosSearch className="absolute left-4 text-gray-400 " />
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="py-4 w-full text-[14px] px-10  rounded-md shadow"
        />
      </div>

      <div className="relative w-60 ">
        <button
          onClick={handleIsOpen}
          className="flex  justify-between  items-center  md:mt-0  px-6 py-3.5 rounded-md shadow-md w-full "
        >
          <span>{region || "Filter by Region"}</span>
          <RiArrowDropDownLine />
        </button>

        {isOpen && (
          <ul className=" absolute top-full mt-1 left-0 z-50  w-full rounded-md py-2 shadow-md  bg-(--bg) text-(--text)">
            {regions.map((region) => {
              return (
                <li
                  key={region}
                  onClick={() => {
                    setRegion(region);
                    setIsOpen(false);
                  }}
                  className="px-6 py-2 cursor-pointer text-sm"
                >
                  {region}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Search;
