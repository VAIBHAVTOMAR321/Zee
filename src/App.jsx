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
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Products from './components/pages/Products';
import Projects from './components/pages/Projects';
import Contact from "./components/pages/Contact";
import { AuthProvider } from './components/all_login/AuthContext';

import NavBar from './components/nav_bar/NavBar';
import Login from "./components/all_login/Login";

import AdminDashboard from "./components/admin_pannel/AdminDashboard";
import AllServices from "./AllServices";
import AllProducts from "./AllProducts";
import AllProjects from "./AllProjects";
import Query from "./Query";


function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = [ "/AdminDashboard", "/AllServices", "/AllProducts", "/AllProjects", "/Query"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <NavBar />}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AllProjects" element={<AllProjects />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/AllServices" element={<AllServices />} />
          <Route path="/Query" element={<Query />} />
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
