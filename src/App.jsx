import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import Home from './components/pages/Home';
import { AuthProvider } from './components/all_login/AuthContext';

import NavBar from './components/nav_bar/NavBar';
import Login from "./components/all_login/Login";

import DirectorDashboard from "./components/director_panel/DirectorDashboard";


function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = [ "/DirectorDashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <NavBar />}
      <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/DirectorDashboard" element={<DirectorDashboard />} />
          <Route path="/Login" element={<Login />} />
          
        </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
