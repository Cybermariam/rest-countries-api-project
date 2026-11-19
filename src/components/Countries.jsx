import React from "react";
import { Link } from "react-router-dom";

const Countries = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No countries found.</p>;
  }
  return (
    <div className="grid gap-10 md:gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((country) => {
        return (
          <Link
            to={`/country/${country.codes.alpha_3}`}
            key={country.codes.alpha_3}
            className="rounded-xl  shadow-md overflow-hidden w-full mx-auto  max-w-sm "
          >
            <img
              src={country.flag?.url_svg}
              className=" w-full h-48 object-cover"
              alt={`Flag of ${country.names.common}`}
            />
            <div className="p-6 text-sm ">
              <h4 className="font-semibold text-lg mb-4">
                {country.names.common}
              </h4>
              <p className="text-lg mb-1">
                Population:{" "}
                <span className="text-gray-600 ">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p className="text-lg mb-1">
                Region:{" "}
                <span className="text-gray-600 ">{country.region} </span>
              </p>
              <p className="text-lg">
                Capital:{" "}
                <span className="text-gray-600">
                  {" "}
                  {country.capitals?.[0]?.name ?? "N/A"}{" "}
                </span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Countries;
