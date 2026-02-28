import React, { useState } from "react";
import Search from "../components/Search";
import Countries from "../components/Countries";
import data from "../../data.json";

const Home = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filteredCountries = data.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region ? country.region === region : true;

    return matchesSearch && matchesRegion;
  });
  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
      />
      <Countries data={filteredCountries} />
    </div>
  );
};

export default Home;
