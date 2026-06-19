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
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./components/all_login/AuthContext";

import AdminLeftnav from "./components/admin_pannel/AdminLeftnav";
import AdminHeader from "./components/admin_pannel/AdminHeader";
import "./AllProjects.css";

const AllProjects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const { accessToken } = useAuth();

  const API_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-project/";
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

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError("Failed to fetch projects.");
        toast.error("Failed to fetch projects.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      }
      setError("An error occurred while fetching projects.");
      toast.error("An error occurred while fetching projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchProjects();
    }
  }, [accessToken]);

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentProject(null);
    setImagePreview(null);
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setCurrentProject({ pro_title: "", pro_desc: "", pro_link: "", pro_img: null });
    setShowModal(true);
  };

  const handleEditClick = (project) => {
    setIsEditing(true);
    setCurrentProject(project);
    if (project.pro_img) {
      setImagePreview(`${MEDIA_BASE_URL}${project.pro_img}`);
    }
    setShowModal(true);
  };

  const handleViewClick = (project) => {
    setCurrentProject(project);
    setShowViewModal(true);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { id: projectToDelete.id },
      });
      toast.success("Project deleted successfully!");
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
      fetchProjects(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete project.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const proImgFile = formData.get("pro_img");

    const submissionData = new FormData();
    submissionData.append("pro_title", formData.get("pro_title"));
    submissionData.append("pro_desc", formData.get("pro_desc"));
    submissionData.append("pro_link", formData.get("pro_link"));

    if (isEditing) {
      submissionData.append("id", currentProject.id);
    }

    if (proImgFile && proImgFile.size > 0) {
      submissionData.append('pro_img', proImgFile);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (isEditing) {
        await axios.put(API_URL, submissionData, config);
        toast.success("Project updated successfully!");
      } else {
        await axios.post(API_URL, submissionData, config);
        toast.success("Project added successfully!");
      }
      handleModalClose();
      fetchProjects();
    } catch (err) {
      toast.error(`Failed to ${isEditing ? "update" : "add"} project.`);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.pro_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredProjects, currentPage]);

  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);

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
              <h4 className="mb-0">Our Projects</h4>
              <Button variant="primary" onClick={handleAddNewClick}>
                <FaPlus className="me-2" /> Add New Project
              </Button>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search projects..."
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
                  <Table responsive hover className="projects-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Link</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProjects.map((project) => (
                        <tr key={project.id}>
                          <td>
                            <Image
                              src={project.pro_img ? `${MEDIA_BASE_URL}${project.pro_img}` : "https://via.placeholder.com/60"}
                              rounded
                              width={60}
                              height={60}
                              style={{ objectFit: "cover" }}
                            />
                          </td>
                          <td>{project.pro_title}</td>
                          <td className="desc-cell">{project.pro_desc}</td>
                          <td><a href={project.pro_link} target="_blank" rel="noopener noreferrer">{project.pro_link}</a></td>
                          <td>{new Date(project.created_at).toLocaleDateString()}</td>
                          <td>
                            <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewClick(project)}><FaEye /></Button>
                            <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEditClick(project)}><FaEdit /></Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(project)}><FaTrash /></Button>
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
          <Modal.Title>{isEditing ? "Edit Project" : "Add New Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="pro_title" defaultValue={currentProject?.pro_title} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} name="pro_desc" defaultValue={currentProject?.pro_desc} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Link</Form.Label>
              <Form.Control name="pro_link" defaultValue={currentProject?.pro_link} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Image</Form.Label>
              <Form.Control type="file" name="pro_img" accept="image/*" onChange={handleImageChange} />
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
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProject && (
            <>
              <Image src={currentProject.pro_img ? `${MEDIA_BASE_URL}${currentProject.pro_img}` : "https://via.placeholder.com/150"} fluid thumbnail className="mb-3" />
              <h4>{currentProject.pro_title}</h4>
              <p>{currentProject.pro_desc}</p>
              <p><strong>Link:</strong> <a href={currentProject.pro_link} target="_blank" rel="noopener noreferrer">{currentProject.pro_link}</a></p>
              <small className="text-muted">Created: {new Date(currentProject.created_at).toLocaleString()}</small>
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
          Are you sure you want to delete the project "{projectToDelete?.pro_title}"?
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

export default AllProjects;