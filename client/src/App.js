import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';

import Home from './pages/home';
import About from './pages/about';
import Ingredients from "./pages/ingredients";
import Ingredient from "./pages/ingredient";
import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";

import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import PasswordReset from "./pages/password-reset";

import AccountPage from "./pages/accountPage/main";

function App() {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const [darkMode, setDarkMode] = useState(savedDarkMode);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/about" element={<About  />} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/accounts/password-reset-confirm/:uid/:token" element={<PasswordReset />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/ingredients/:id" element={<Ingredient />} />
        <Route path="/recipes" element={<Recipes darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/recipes/:id" element={<Recipe darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
