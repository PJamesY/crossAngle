import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SurveyPage from "./pages/SurveyPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <header>Cross Angle</header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
      <footer>Footer</footer>
    </Router>
  );
}

export default App;
