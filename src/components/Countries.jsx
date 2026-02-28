import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="grid gap-10 md:gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {countries.map((country) => {
        return (
          <Link
            to={`/country/${country.cca3}`}
            key={country.cca3}
            className="rounded-xl  shadow-md overflow-hidden w-full mx-auto  max-w-sm "
          >
            <img
              src={country.flags?.svg}
              className=" w-full h-48 object-cover"
              alt={`Flag of ${country.name.common}`}
            />
            <div className="p-6 text-sm ">
              <h4 className="font-semibold text-lg mb-4">
                {country.name.common}
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
                <span className="text-gray-600"> {country.capital?.[0]} </span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Countries;
