import React from "react";
import { Route, Routes } from "react-router-dom";

import AboutPage from "./Pages/About/About.page";
import HomePage from "./Pages/Home/Home.page";

import { useEffect } from "react";
import { themeChange } from "theme-change";
import FooterComponent from "./Components/Footer/Footer.component";
import NavbarComponent from "./Components/Navbar/Navbar.component";
import ActivationPage from "./Pages/Activation/Activation.page";
import CreateProblemPage from "./Pages/CreateProblem/CreateProblem.page";
import LoginPage from "./Pages/Login/Login.page";
import ProblemPage from "./Pages/Problem/Problem.page";
import ProblemsetPage from "./Pages/Problemset/Problemset.page";
import RegisterPage from "./Pages/Register/Register.page";

export default function App() {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route exact path="" element={<HomePage />} />
        <Route path="/problemset" element={<ProblemsetPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/problem/:id*" element={<ProblemPage />} />
        <Route path="/createproblem" element={<CreateProblemPage />} />
        <Route
          path="activate/<str:uidb64>/<str:token>"
          element={<ActivationPage />}
        />
      </Routes>

      <FooterComponent />
    </div>
  );
}
