import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Data from "./components/pages/Data";
import Create from "./components/pages/Create";
import Update from "./components/pages/Update";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
};

export default App;
