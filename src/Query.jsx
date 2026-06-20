import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, Button, Modal, Spinner, Alert, Table, Pagination, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaSearch, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./components/all_login/AuthContext"; // Adjust path if needed

import AdminLeftnav from "./components/admin_pannel/AdminLeftNav"; // Adjust path if needed
import AdminHeader from "./components/admin_pannel/AdminHeader"; // Adjust path if needed
import "./Query.css";

const Query = () => {
  // Layout State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  // Data State
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(null);

  // Search & Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 10;

  const { accessToken } = useAuth();

  const API_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend/api/contact-us/";

  // Responsive resize listener
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      // Based on the prompt, the API returns an array directly
      if (Array.isArray(response.data)) {
        // Sort by newest first
        const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setQueries(sortedData);
      } else {
        // Fallback if it's wrapped in an object like { success: true, data: [...] }
        setQueries(response.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching queries:", err);
      if (err.response && err.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
        setError("Unauthorized. Please log in again.");
      } else {
        toast.error("An error occurred while fetching queries.");
        setError("An error occurred while fetching queries.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchQueries();
    }
  }, [accessToken]);

  const handleViewClick = (query) => {
    setCurrentQuery(query);
    setShowViewModal(true);
  };

  const filteredQueries = useMemo(() => {
    if (!searchTerm) return queries;
    return queries.filter(
      (query) =>
        query.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.mobile_number.includes(searchTerm)
    );
  }, [queries, searchTerm]);

  const paginatedQueries = useMemo(() => {
    const startIndex = (currentPage - 1) * queriesPerPage;
    return filteredQueries.slice(startIndex, startIndex + queriesPerPage);
  }, [filteredQueries, currentPage]);

  const pageCount = Math.ceil(filteredQueries.length / queriesPerPage);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
        <Container fluid className="mt-4">
          <Card className="p-3 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Contact Us Queries</h4>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search by name, email, or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : filteredQueries.length === 0 ? (
                <Alert variant="info">No queries found.</Alert>
              ) : (
                <>
                  <Table responsive hover className="queries-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Message</th>
                        <th>Received At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedQueries.map((query) => (
                        <tr key={query.id}>
                          <td>{query.id}</td>
                          <td>{query.full_name}</td>
                          <td>
                            <a href={`mailto:${query.email}`} className="text-decoration-none">
                              {query.email}
                            </a>
                          </td>
                          <td>
                            <a href={`tel:${query.mobile_number}`} className="text-decoration-none">
                              {query.mobile_number}
                            </a>
                          </td>
                          <td className="message-cell">{query.message}</td>
                          <td>{new Date(query.created_at).toLocaleString()}</td>
                          <td>
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleViewClick(query)}
                            >
                              <FaEye /> View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {pageCount > 1 && (
                    <Pagination className="justify-content-center">
                      <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                      {[...Array(pageCount).keys()].map((number) => (
                        <Pagination.Item
                          key={number + 1}
                          active={number + 1 === currentPage}
                          onClick={() => setCurrentPage(number + 1)}
                        >
                          {number + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        disabled={currentPage === pageCount}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      />
                    </Pagination>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Query Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentQuery && (
            <div className="query-details">
              <div className="d-flex align-items-center mb-3">
                <div className="query-avatar me-3">
                  <FaUser />
                </div>
                <div>
                  <h5 className="mb-0">{currentQuery.full_name}</h5>
                  <small className="text-muted">ID: {currentQuery.id}</small>
                </div>
              </div>

              <Row className="mb-4">
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-center text-muted">
                    <FaEnvelope className="me-2" />
                    <a href={`mailto:${currentQuery.email}`} className="text-decoration-none text-dark">
                      {currentQuery.email}
                    </a>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-center text-muted">
                    <FaPhone className="me-2" />
                    <a href={`tel:${currentQuery.mobile_number}`} className="text-decoration-none text-dark">
                      {currentQuery.mobile_number}
                    </a>
                  </div>
                </Col>
              </Row>

              <h6 className="text-primary border-bottom pb-2 mb-3">Message</h6>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                {currentQuery.message}
              </p>

              <div className="text-end mt-4">
                <small className="text-muted">
                  Received on: {new Date(currentQuery.created_at).toLocaleString()}
                </small>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Query;