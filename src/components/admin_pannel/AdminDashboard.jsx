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
            <Row className="g-4">
              <Col md={6} xl={4}>
                <div className="card-wrapper">
                  <Card className="dashboard-card card-services h-100">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="dashboard-card-icon services-icon">
                          <FaCogs size={24} />
                        </div>
                        <div className="ms-3 text-start">
                          <p className="dashboard-card-title mb-0">Total Services</p>
                          <h4 className="dashboard-card-value mb-0">15</h4>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>

              <Col md={6} xl={4}>
                <div className="card-wrapper">
                  <Card className="dashboard-card card-projects h-100">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="dashboard-card-icon projects-icon">
                          <FaProjectDiagram size={24} />
                        </div>
                        <div className="ms-3 text-start">
                          <p className="dashboard-card-title mb-0">Total Projects</p>
                          <h4 className="dashboard-card-value mb-0">25</h4>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>

              <Col md={6} xl={4}>
                <div className="card-wrapper">
                  <Card className="dashboard-card card-products h-100">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="dashboard-card-icon products-icon">
                          <FaBoxOpen size={24} />
                        </div>
                        <div className="ms-3 text-start">
                          <p className="dashboard-card-title mb-0">Total Products</p>
                          <h4 className="dashboard-card-value mb-0">50</h4>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
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