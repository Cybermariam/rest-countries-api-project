import React from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
const App = () => {
  return (
    <div
      className="min-h-screen bg-(--bg) text-(--text)
"
    >
      <Navbar />
      <Search />
    </div>
  );
};

export default App;
