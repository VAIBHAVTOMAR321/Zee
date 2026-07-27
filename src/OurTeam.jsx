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
import "./OurTeam.css"; // You can create this CSS file or reuse AllProjects.css styles

const OurTeam = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [teamMemberToDelete, setTeamMemberToDelete] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teamMembersPerPage = 5;

  const { accessToken } = useAuth();

  const API_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend/api/ourteam-items/";
  const MEDIA_BASE_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend";

  // Category choices as requested, sending capitalized values to backend
  const CATEGORY_CHOICES = [
    "Administrator",
    "Marketing",
    "Developer",
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        setTeamMembers(response.data.data);
      } else {
        setError("Failed to fetch team members.");
        toast.error("Failed to fetch team members.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      }
      setError("An error occurred while fetching team members.");
      toast.error("An error occurred while fetching team members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchTeamMembers();
    }
  }, [accessToken]);

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentTeamMember(null);
    setImagePreview(null);
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setCurrentTeamMember({ category: "", full_name: "", designation: "", image: null });
    setShowModal(true);
  };

  const handleEditClick = (member) => {
    setIsEditing(true);
    // Ensure the category is capitalized to match dropdown values
    const capitalizedCategory = member.category.charAt(0).toUpperCase() + member.category.slice(1);
    setCurrentTeamMember({
      ...member,
      category: capitalizedCategory,
    });

    if (member.image) {
      setImagePreview(`${MEDIA_BASE_URL}${member.image}`);
    } else {
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleViewClick = (member) => {
    setCurrentTeamMember(member);
    setShowViewModal(true);
  };

  const handleDeleteClick = (member) => {
    setTeamMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!teamMemberToDelete) return;
    try {
      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { id: teamMemberToDelete.id },
      });
      toast.success("Team member deleted successfully!");
      setShowDeleteConfirm(false);
      setTeamMemberToDelete(null);
      fetchTeamMembers(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete team member.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const submissionData = new FormData();
    submissionData.append("category", formData.get("category"));
    submissionData.append("full_name", formData.get("full_name"));
    submissionData.append("designation", formData.get("designation"));

    const memberImageFile = formData.get("image");
    if (memberImageFile && memberImageFile.size > 0) {
      submissionData.append('image', memberImageFile);
    } else if (isEditing && currentTeamMember.image && !memberImageFile) {
        // If editing and no new file is selected, but an old image exists,
        // the backend should typically retain the existing image.
        // If your backend requires explicit handling (e.g., sending a flag or the old image URL),
        // you would add that logic here. For now, we assume the backend handles it implicitly.
    }

    if (isEditing) {
      submissionData.append("id", currentTeamMember.id);
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
        toast.success("Team member updated successfully!");
      } else {
        await axios.post(API_URL, submissionData, config);
        toast.success("Team member added successfully!");
      }
      handleModalClose();
      fetchTeamMembers();
    } catch (err) {
      toast.error(`Failed to ${isEditing ? "update" : "add"} team member.`);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImagePreview(null); // Clear preview if no file selected
    }
  };

  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter((member) =>
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teamMembers, searchTerm]);

  const paginatedTeamMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * teamMembersPerPage;
    return filteredTeamMembers.slice(startIndex, startIndex + teamMembersPerPage);
  }, [filteredTeamMembers, currentPage]);

  const pageCount = Math.ceil(filteredTeamMembers.length / teamMembersPerPage);

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
              <h4 className="mb-0">Our Team</h4>
              <Button variant="primary" onClick={handleAddNewClick}>
                <FaPlus className="me-2" /> Add New Team Member
              </Button>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search team members..."
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
                  <Table responsive hover className="team-members-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Full Name</th>
                        <th>Designation</th>
                        <th>Category</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTeamMembers.map((member) => (
                        <tr key={member.id}>
                          <td>
                            <Image
                              src={member.image ? `${MEDIA_BASE_URL}${member.image}` : "https://via.placeholder.com/60"}
                              rounded
                              width={60}
                              height={60}
                              style={{ objectFit: "cover" }}
                            />
                          </td>
                          <td>{member.full_name}</td>
                          <td>{member.designation}</td>
                          <td>{member.category}</td>
                          <td>{new Date(member.created_at).toLocaleDateString()}</td>
                          <td>
                            <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewClick(member)}><FaEye /></Button>
                            <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEditClick(member)}><FaEdit /></Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(member)}><FaTrash /></Button>
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
          <Modal.Title>{isEditing ? "Edit Team Member" : "Add New Team Member"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="full_name" defaultValue={currentTeamMember?.full_name} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control name="designation" defaultValue={currentTeamMember?.designation} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" defaultValue={currentTeamMember?.category} required>
                <option value="">Select Category</option>
                {CATEGORY_CHOICES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" onChange={handleImageChange} />
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
          <Modal.Title>Team Member Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTeamMember && (
            <>
              <Image src={currentTeamMember.image ? `${MEDIA_BASE_URL}${currentTeamMember.image}` : "https://via.placeholder.com/150"} fluid thumbnail className="mb-3" />
              <h4>{currentTeamMember.full_name}</h4>
              <p><strong>Designation:</strong> {currentTeamMember.designation}</p>
              <p><strong>Category:</strong> {currentTeamMember.category}</p>
              <small className="text-muted">Created: {new Date(currentTeamMember.created_at).toLocaleString()}</small>
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
          Are you sure you want to delete team member "{teamMemberToDelete?.full_name}"?
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

export default OurTeam;