import React from "react";
import data from "../../data.json";

const Countries = () => {
  const selectedNames = [
    "Germany",
    "United States of America",
    "Brazil",
    "Iceland",
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
  ];
  const displayCountries = selectedNames
    .map((name) => data.find((country) => country.name === name))
    .filter(Boolean);

  return (
    <div className="grid gap-10 md:gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {displayCountries.map((country) => {
        return (
          <div
            key={country.id}
            className="rounded-xl  shadow-md overflow-hidden w-full mx-auto  max-w-sm "
          >
            <img
              src={country.flags.svg}
              className=" w-full h-48 object-cover"
            />
            <div className="p-6 text-sm ">
              <h4 className="font-semibold text-lg mb-4">{country.name}</h4>
              <p className="text-lg mb-1">
                Population:{" "}
                <span className="text-gray-600 ">{country.population}</span>
              </p>
              <p className="text-lg mb-1">
                Region:{" "}
                <span className="text-gray-600 ">{country.region} </span>
              </p>
              <p className="text-lg">
                Capital:{" "}
                <span className="text-gray-600"> {country.capital} </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Countries;
