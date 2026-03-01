import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const CountryDetails = () => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(-1);
  };
  const { cca3 } = useParams();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          ` https://restcountries.com/v3.1/alpha/${cca3}`,
        );
        if (!response.ok) {
          throw new Error("country not found");
        }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!country) return <h2>Country not found</h2>;

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
    <>
      <button
        className="flex space-x-2 items-center mb-10 shadow-lg px-6 py-3 "
        onClick={handleBackButton}
      >
        <IoIosArrowRoundBack />
        <span>Back</span>
      </button>

      <div>
        <img src={country.flags?.svg} alt={country.name.common} />
        <div>
          <h3>{country.name.common}</h3>
          <div>
            <div>
              <p>
                <span> Native Name: </span>
                <span>{nativeName}</span>
              </p>

              <p>
                <span>Population: </span>
                <span>{country.population?.toLocaleString()}</span>
              </p>
              <p>
                <span> Region:</span>
                <span>{country.region}</span>
              </p>
              <p>
                <span> Sub Region: </span>
                <span>{country.subregion}</span>
              </p>

              <p>
                <span> Capital: </span>
                <span>{country.capital?.[0]}</span>
              </p>
            </div>
            <div>
              <p>
                <span>Top Level Domain:</span>
                <span>{country.tld?.join(", ")}</span>
              </p>
              <p>
                <span>Currencies:</span>
                <span>{currencies}</span>
              </p>
              <p>
                <span>Languages:</span>
                <span>{languages}</span>
              </p>
            </div>
          </div>
          <div>
            <span>Border Countries: </span>
            <span>{country.borders?.join(", ") || "None"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryDetails;
