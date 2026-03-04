import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const CountryDetails = () => {
  const navigate = useNavigate();
  const { cca3 } = useParams();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${cca3}`,
        );
        if (!response.ok) throw new Error("Country not found");
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, [cca3]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!country) return <h2 className="p-8">Country not found</h2>;

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 shadow-md px-8 py-2 rounded-md mb-16 transition-transform hover:scale-105"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowRoundBack size={25} />
        <span>Back</span>
      </button>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {" "}
        {/* Use items-start here */}
        <img
          src={country.flags?.svg}
          alt={country.name.common}
          className="w-full shadow-md rounded-sm"
        />
        <div className="py-2">
          <h1 className="text-3xl font-extrabold mb-8">
            {country.name.common}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
            {/* Left Column */}
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Native Name:
                </span>{" "}
                {nativeName}
              </p>
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Population:
                </span>{" "}
                {country.population?.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Region:
                </span>{" "}
                {country.region}
              </p>
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Sub Region:
                </span>{" "}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Capital:
                </span>{" "}
                {country.capital?.[0]}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Top Level Domain:
                </span>{" "}
                {country.tld?.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Currencies:
                </span>{" "}
                {currencies}
              </p>
              <p className="wrap-break-word">
                <span className="font-semibold text-sm lg:text-base">
                  Languages:
                </span>{" "}
                {languages}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <span className="font-semibold whitespace-nowrap">
              Border Countries:
            </span>
            <div className="flex flex-wrap gap-2">
              {country.borders?.map((b) => (
                <Link
                  to={`/country/${b}`}
                  key={b}
                  className="shadow-sm border px-4 py-1 border-gray-300 rounded-sm text-sm min-w-20 text-center"
                >
                  {b}
                </Link>
              )) || <span>None</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
