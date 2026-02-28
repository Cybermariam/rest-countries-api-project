import React from "react";
import Navbar from "./components/Navbar";
import CountryDetails from "./components/CountriesDetails";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div
      className="min-h-screen bg-(--bg) text-(--text)
"
    >
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 lg:px-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
