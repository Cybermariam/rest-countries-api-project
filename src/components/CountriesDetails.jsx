import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../data.json";
import { IoIosArrowRoundBack } from "react-icons/io";

const CountriesDetails = () => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(-1);
  };
  const { code } = useParams();
  const country = data.find(
    (item) => item.alpha3Code.toLowerCase() === code?.toLowerCase(),
  );
  if (!country) return <h2>Country not found</h2>;
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
        <img src={country.flag} alt={country.name} />
        <div>
          <h3>{country.name}</h3>
          <div>
            <div>
              <p>
                <span> Native Name: </span>
                <span>{country.nativeName}</span>
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
                <span>{country.capital}</span>
              </p>
            </div>
            <div>
              <p>
                <span>Top Level Domain:</span>
                <span>{country.topLevelDomain?.join(", ")}</span>
              </p>
              <p>
                <span>Currencies:</span>
                <span>
                  {country.currencies
                    ?.map((currency) => currency.name)
                    .join(", ")}
                </span>
              </p>
              <p>
                <span>Languages:</span>
                <span>
                  {country.languages
                    ?.map((language) => language.name)
                    .join(", ")}
                </span>
              </p>
            </div>
          </div>
          <div>
            <span>Border Countries: </span>
            <span>
              {country.borders
                ?.map(
                  (borderCode) =>
                    data.find((c) => c.alpha3Code === borderCode)?.name,
                )
                .join(", ")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountriesDetails;
