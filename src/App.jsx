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
import Footer from './components/pages/Footer';

import AdminDashboard from "./components/admin_pannel/AdminDashboard";
import AllServices from "./AllServices";
import AllProducts from "./AllProducts";
import AllProjects from "./AllProjects";
import Query from "./Query";
import ProtectedRoute from "./components/all_login/ProtectedRoute";


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

          <Route path="/AdminDashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/AllProjects" element={
            <ProtectedRoute>
              <AllProjects />
            </ProtectedRoute>
          } />
          <Route path="/AllProducts" element={
            <ProtectedRoute>
              <AllProducts />
            </ProtectedRoute>
          } />
          <Route path="/AllServices" element={
            <ProtectedRoute>
              <AllServices />
            </ProtectedRoute>
          } />
          <Route path="/Query" element={
            <ProtectedRoute>
              <Query />
            </ProtectedRoute>
          } />
          <Route path="/Login" element={<Login />} />
          
        </Routes>
        {!shouldHideNavbar && <Footer />}
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
