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
import "./AllProducts.css";

const AllProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const { accessToken } = useAuth();

  const API_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-product/";
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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError("Failed to fetch products.");
        toast.error("Failed to fetch products.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      }
      setError("An error occurred while fetching products.");
      toast.error("An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchProducts();
    }
  }, [accessToken]);

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentProduct(null);
    setImagePreview(null);
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setCurrentProduct({ prod_title: "", prod_desc: "", prod_img: null });
    setShowModal(true);
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    if (product.prod_img) {
      setImagePreview(`${MEDIA_BASE_URL}${product.prod_img}`);
    }
    setShowModal(true);
  };

  const handleViewClick = (product) => {
    setCurrentProduct(product);
    setShowViewModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { id: productToDelete.id },
      });
      toast.success("Product deleted successfully!");
      setShowDeleteConfirm(false);
      setProductToDelete(null);
      fetchProducts(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete product.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const prodImgFile = formData.get("prod_img");

    const submissionData = new FormData();
    submissionData.append("prod_title", formData.get("prod_title"));
    submissionData.append("prod_desc", formData.get("prod_desc"));

    if (isEditing) {
      submissionData.append("id", currentProduct.id);
    }

    if (prodImgFile && prodImgFile.size > 0) {
      submissionData.append('prod_img', prodImgFile);
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
        toast.success("Product updated successfully!");
      } else {
        await axios.post(API_URL, submissionData, config);
        toast.success("Product added successfully!");
      }
      handleModalClose();
      fetchProducts();
    } catch (err) {
      toast.error(`Failed to ${isEditing ? "update" : "add"} product.`);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.prod_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

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
              <h4 className="mb-0">Our Products</h4>
              <Button variant="primary" onClick={handleAddNewClick}>
                <FaPlus className="me-2" /> Add New Product
              </Button>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search products..."
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
                  <Table responsive hover className="products-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProducts.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <Image
                              src={product.prod_img ? `${MEDIA_BASE_URL}${product.prod_img}` : "https://via.placeholder.com/60"}
                              rounded
                              width={60}
                              height={60}
                              style={{ objectFit: "cover" }}
                            />
                          </td>
                          <td>{product.prod_title}</td>
                          <td className="desc-cell">{product.prod_desc}</td>
                          <td>{new Date(product.created_at).toLocaleDateString()}</td>
                          <td>
                            <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleViewClick(product)}><FaEye /></Button>
                            <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEditClick(product)}><FaEdit /></Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(product)}><FaTrash /></Button>
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
          <Modal.Title>{isEditing ? "Edit Product" : "Add New Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="prod_title" defaultValue={currentProduct?.prod_title} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} name="prod_desc" defaultValue={currentProduct?.prod_desc} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" name="prod_img" accept="image/*" onChange={handleImageChange} />
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
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <>
              <Image src={currentProduct.prod_img ? `${MEDIA_BASE_URL}${currentProduct.prod_img}` : "https://via.placeholder.com/150"} fluid thumbnail className="mb-3" />
              <h4>{currentProduct.prod_title}</h4>
              <p>{currentProduct.prod_desc}</p>
              <small className="text-muted">Created: {new Date(currentProduct.created_at).toLocaleString()}</small>
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
          Are you sure you want to delete the product "{productToDelete?.prod_title}"?
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

export default AllProducts;