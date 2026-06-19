import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import "../../assets/css/AdminLeftnav.css";
import "../../assets/css/AdminDashboard.css";
import AdminLeftnav from "./AdminLeftnav";
import AdminHeader from "./AdminHeader";
import { FaCogs, FaProjectDiagram, FaBoxOpen, FaServer, FaCube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../all_login/AuthContext";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [counts, setCounts] = useState({ services: 0, projects: 0, products: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      if (!accessToken) {
        setLoading(false);
        setError("Authentication token not found.");
        return;
      }

      setLoading(true);
      setError(null);

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      try {
        const [servicesRes, projectsRes, productsRes] = await Promise.all([
          axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-service/", config),
          axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-project/", config),
          axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-product/", config),
        ]);

        setCounts({
          services: servicesRes.data?.data?.length || 0,
          projects: projectsRes.data?.data?.length || 0,
          products: productsRes.data?.data?.length || 0,
        });
      } catch (err) {
        setError("Failed to fetch dashboard data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [accessToken]);

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
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading Dashboard...</p>
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <div className="admin-dashboard">
                <Row className="g-4">
                  <Col md={6} xl={4}>
                    <div className="card-wrapper" onClick={() => navigate("/AllServices")}>
                      <Card className="dashboard-card card-services h-100">
                        <Card.Body>
                          <div className="d-flex align-items-center">
                            <div className="dashboard-card-icon services-icon">
                              <FaServer size={24} />
                            </div>
                            <div className="ms-3 text-start">
                              <p className="dashboard-card-title mb-0">Total Services</p>
                              <h4 className="dashboard-card-value mb-0">{counts.services}</h4>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>

                  <Col md={6} xl={4}>
                    <div className="card-wrapper" onClick={() => navigate("/AllProjects")}>
                      <Card className="dashboard-card card-projects h-100">
                        <Card.Body>
                          <div className="d-flex align-items-center">
                            <div className="dashboard-card-icon projects-icon">
                              <FaProjectDiagram size={24} />
                            </div>
                            <div className="ms-3 text-start">
                              <p className="dashboard-card-title mb-0">Total Projects</p>
                              <h4 className="dashboard-card-value mb-0">{counts.projects}</h4>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>

                  <Col md={6} xl={4}>
                    <div className="card-wrapper" onClick={() => navigate("/AllProducts")}>
                      <Card className="dashboard-card card-products h-100">
                        <Card.Body>
                          <div className="d-flex align-items-center">
                            <div className="dashboard-card-icon products-icon">
                              <FaCube size={24} />
                            </div>
                            <div className="ms-3 text-start">
                              <p className="dashboard-card-title mb-0">Total Products</p>
                              <h4 className="dashboard-card-value mb-0">{counts.products}</h4>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                </Row>
                {/* You can add more dashboard components here */}
              </div>
            )}
          </Container>
       </div>
     </div>
   );
};

export default AdminDashboard;