import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../all_login/AuthContext";
import "../../assets/css/AdminLeftnav.css";
import AdminLeftnav from "./AdminLeftnav";
import AdminHeader from "./AdminHeader";




const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


   const toggleSidebar = () => {
     setSidebarOpen(!sidebarOpen);
   };

   return (
     <div className="dashboard-container">
       <AdminLeftnav
         sidebarOpen={sidebarOpen}
         setSidebarOpen={setSidebarOpen}
         isMobile={isMobile}
         isTablet={isTablet}
       />
       <div className="main-content-dash">
         <AdminHeader toggleSidebar={toggleSidebar} />

         <Container fluid className="dashboard-box mt-3">
          Admin Dashboard Content
         </Container>
       </div>
     </div>
   );
};

export default AdminDashboard;