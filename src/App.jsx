import React from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Countries from "./components/Countries";
const App = () => {
  return (
    <div
      className="min-h-screen bg-(--bg) text-(--text)
"
    >
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 lg:px-12">
        <Search />
        <Countries />
      </main>
    </div>
  );
};

export default App;
