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
    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/.netlify/functions/country?code=${encodeURIComponent(cca3)}`,
        );

        if (!response.ok) throw new Error("Country not found");
        const data = await response.json();
        setCountry(data.data.objects[0] ?? null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [cca3]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!country) return <h2 className="p-8">Country not found</h2>;
  const nativeName = country.names?.native
    ? (Object.values(country.names.native)[0]?.common ?? "N/A")
    : "N/A";

  const currencies = country.currencies?.length
    ? country.currencies.map((c) => c.name).join(", ")
    : "N/A";

  const languages = country.languages?.length
    ? country.languages.map((language) => language.name).join(", ")
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
          src={country.flag?.url_svg}
          alt={country.names.common}
          className="w-full shadow-md rounded-sm"
        />
        <div className="py-2">
          <h1 className="text-3xl font-extrabold mb-8">
            {country.names.common}
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
                {country.population?.toLocaleString() ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Region:
                </span>{" "}
                {country.region ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Sub Region:
                </span>{" "}
                {country.subregion ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Capital:
                </span>{" "}
                {country.capitals?.[0]?.name ?? "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold text-sm lg:text-base">
                  Top Level Domain:
                </span>{" "}
                {country.tlds?.join(", ") ?? "N/A"}
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
              {country.borders?.length ? (
                country.borders.map((border) => (
                  <Link
                    to={`/country/${border}`}
                    key={border}
                    className="shadow-sm border px-4 py-1 border-gray-300 rounded-sm text-sm min-w-20 text-center"
                  >
                    {border}
                  </Link>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
