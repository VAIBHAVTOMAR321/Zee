import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "../../assets/css/AdminLeftnav.css";
import "../../assets/css/AdminDashboard.css";
import AdminLeftnav from "./AdminLeftnav";
import AdminHeader from "./AdminHeader";
import { FaCogs, FaProjectDiagram, FaBoxOpen } from "react-icons/fa";



const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
          <div className="admin-dashboard">
            <h2 className="dashboard-title py-3">Dashboard</h2>
            <Row>
              <Col md={6} xl={4} className="mb-4">
                <Card className="dashboard-card h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="card-icon-container bg-primary text-white">
                        <FaCogs size={30} />
                      </div>
                      <div className="ms-3">
                        <p className="text-muted mb-0">Total Services</p>
                        <h4 className="mb-0 fw-bold">15</h4>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} xl={4} className="mb-4">
                <Card className="dashboard-card h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="card-icon-container bg-success text-white">
                        <FaProjectDiagram size={30} />
                      </div>
                      <div className="ms-3">
                        <p className="text-muted mb-0">Total Projects</p>
                        <h4 className="mb-0 fw-bold">25</h4>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} xl={4} className="mb-4">
                <Card className="dashboard-card h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="card-icon-container bg-warning text-white">
                        <FaBoxOpen size={30} />
                      </div>
                      <div className="ms-3">
                        <p className="text-muted mb-0">Total Products</p>
                        <h4 className="mb-0 fw-bold">50</h4>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* You can add more dashboard components here */}
          </div>
         </Container>
       </div>
     </div>
   );
};

export default AdminDashboard;