import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Countries from "../components/Countries";

const Home = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/.netlify/functions/countries");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setCountries(data.data.objects);
      } catch (error) {
        console.log("Error fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const commonName = country.names?.common?.toLowerCase() ?? "";
    const matchesSearch = commonName.includes(search.toLowerCase());
    const matchesRegion = region
      ? country.region?.toLowerCase() === region.toLowerCase()
      : true;

    return matchesSearch && matchesRegion;
  });

  return (
    <main>
      <Search
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
      />
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <Countries data={filteredCountries} />
      )}
    </main>
  );
};

export default Home;
