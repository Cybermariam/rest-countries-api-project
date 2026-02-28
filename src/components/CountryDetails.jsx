import React from "react";
import data from "../../data.json";
import { IoIosArrowRoundBack } from "react-icons/io";

const CountryDetails = () => {
  const country = data[21]; // replace later with useParams logic

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111517] px-6 md:px-16 lg:px-24 py-10 md:py-16">
      {/* Back Button */}
      <button className="flex items-center gap-2 px-8 py-2 bg-white shadow-md rounded-md mb-16 hover:scale-105 transition pointer">
        <IoIosArrowRoundBack className="text-xl" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {country && (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
          {/* Flag */}
          <div className="w-full lg:w-1/2">
            <img
              src={country.flag}
              alt={country.name}
              className="w-full h-65 md:h-87.5 object-cover shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-10">
              {country.name}
            </h1>

            <div className="flex flex-col md:flex-row justify-between gap-10 mb-14">
              {/* Left Info */}
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold">Native Name:</span>{" "}
                  {country.nativeName}
                </p>
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population?.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>
                <p>
                  <span className="font-semibold">Sub Region:</span>{" "}
                  {country.subregion}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital}
                </p>
              </div>

              {/* Right Info */}
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  {country.topLevelDomain?.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Currencies:</span>{" "}
                  {country.currencies?.map((cur) => cur.name).join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Languages:</span>{" "}
                  {country.languages?.map((lang) => lang.name).join(", ")}
                </p>
              </div>
            </div>

            {/* Borders */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="font-semibold text-sm whitespace-nowrap">
                Border Countries:
              </span>

              <div className="flex flex-wrap gap-3">
                {country.borders?.map((border, index) => (
                  <button
                    key={index}
                    className="px-6 py-1 bg-white shadow rounded text-xs hover:scale-105 transition"
                  >
                    {border}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
