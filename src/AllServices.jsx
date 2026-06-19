import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Table,
  Image,
  Pagination,
  InputGroup,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./components/all_login/AuthContext";

import AdminLeftnav from "./components/admin_pannel/AdminLeftnav";
import AdminHeader from "./components/admin_pannel/AdminHeader";
import "./AllServices.css";

const AllServices = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  const { accessToken } = useAuth();

  const API_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-service/";
  const MEDIA_BASE_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        setServices(response.data.data);
      } else {
        setError("Failed to fetch services.");
        toast.error("Failed to fetch services.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      }
      setError("An error occurred while fetching services.");
      toast.error("An error occurred while fetching services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchServices();
    }
  }, [accessToken]);

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentService(null);
    setImagePreview(null);
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setCurrentService({ title: "", sub_title: "", desc: "", service_img: null });
    setShowModal(true);
  };

  const handleEditClick = (service) => {
    setIsEditing(true);
    setCurrentService(service);
    if (service.service_img) {
      setImagePreview(`${MEDIA_BASE_URL}${service.service_img}`);
    }
    setShowModal(true);
  };

  const handleViewClick = (service) => {
    setCurrentService(service);
    setShowViewModal(true);
  };

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { id: serviceToDelete.id },
      });
      toast.success("Service deleted successfully!");
      setShowDeleteConfirm(false);
      setServiceToDelete(null);
      fetchServices(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete service.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const serviceImgFile = formData.get("service_img");

    const submissionData = new FormData();
    submissionData.append("title", formData.get("title"));
    submissionData.append("sub_title", formData.get("sub_title"));
    submissionData.append("desc", formData.get("desc"));

    if (isEditing) {
      submissionData.append("id", currentService.id);
    }

    if (serviceImgFile && serviceImgFile.size > 0) {
      submissionData.append('service_img', serviceImgFile);
    } else if (isEditing && currentService.service_img) {
      // If not providing a new image on edit, the backend should handle retaining the old one.
      // Some backends might require you to send the old image URL.
      // submissionData.append('service_img', currentService.service_img);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (isEditing) {
        // Note: The provided API docs use PUT with a JSON payload.
        // If file uploads on PUT don't work, the backend might expect POST for updates with files.
        await axios.put(API_URL, submissionData, config);
        toast.success("Service updated successfully!");
      } else {
        await axios.post(API_URL, submissionData, config);
        toast.success("Service added successfully!");
      }
      handleModalClose();
      fetchServices();
    } catch (err) {
      toast.error(`Failed to ${isEditing ? "update" : "add"} service.`);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.sub_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * servicesPerPage;
    return filteredServices.slice(startIndex, startIndex + servicesPerPage);
  }, [filteredServices, currentPage]);

  const pageCount = Math.ceil(filteredServices.length / servicesPerPage);

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
              <h4 className="mb-0">All Services</h4>
              <Button variant="primary" onClick={handleAddNewClick}>
                <FaPlus className="me-2" /> Add New Service
              </Button>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search services..."
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
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <>
                  <Table responsive hover className="services-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Sub Title</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedServices.map((service) => (
                        <tr key={service.id}>
                          <td>
                            <Image
                              src={service.service_img ? `${MEDIA_BASE_URL}${service.service_img}` : "https://via.placeholder.com/60"}
                              rounded
                              width={60}
                              height={60}
                              style={{ objectFit: "cover" }}
                            />
                          </td>
                          <td>{service.title}</td>
                          <td>{service.sub_title}</td>
                          <td className="desc-cell">{service.desc}</td>
                          <td>{new Date(service.created_at).toLocaleDateString()}</td>
                          <td>
                            <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewClick(service)}><FaEye /></Button>
                            <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEditClick(service)}><FaEdit /></Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(service)}><FaTrash /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {pageCount > 1 && (
                    <Pagination>
                      {[...Array(pageCount).keys()].map(number => (
                        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
                          {number + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Service" : "Add New Service"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" defaultValue={currentService?.title} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sub Title</Form.Label>
              <Form.Control name="sub_title" defaultValue={currentService?.sub_title} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} name="desc" defaultValue={currentService?.desc} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service Image</Form.Label>
              <Form.Control type="file" name="service_img" accept="image/*" onChange={handleImageChange} />
              {imagePreview && <Image src={imagePreview} thumbnail className="mt-2" width={150} />}
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={handleModalClose} className="me-2">Cancel</Button>
              <Button variant="primary" type="submit">Save Changes</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Service Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentService && (
            <>
              <Image src={currentService.service_img ? `${MEDIA_BASE_URL}${currentService.service_img}` : "https://via.placeholder.com/150"} fluid thumbnail className="mb-3" />
              <h4>{currentService.title}</h4>
              <h5>{currentService.sub_title}</h5>
              <p>{currentService.desc}</p>
              <small className="text-muted">Created: {new Date(currentService.created_at).toLocaleString()}</small>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the service "{serviceToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AllServices;