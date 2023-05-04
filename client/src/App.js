import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectedCountry from "./pages/SelectedCountry";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/v1/:country" element={<SelectedCountry />} />
      </Routes>
    </>
  );
}

export default App;
