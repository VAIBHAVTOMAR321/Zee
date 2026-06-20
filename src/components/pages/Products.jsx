import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../../products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MEDIA_BASE_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-product/");
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError("Failed to fetch products.");
        }
      } catch (err) {
        setError("An error occurred while fetching products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070";
  };

  return (
    <div className="products-page">
      <header className="products-hero-section py-5">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-2">
          <h1 className="display-4 fw-bold mb-3">Our Products</h1>
          <p className="lead fs-5 mb-0">
            Innovative hardware and software solutions for the modern enterprise.
          </p>
        </Container>
      </header>

      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title">Our Products</h2>
            <p className="lead products-subtitle">Innovative hardware and software solutions for the modern enterprise.</p>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading Products...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Row className="g-4">
              {products.map(product => (
                <Col lg={4} md={6} key={product.id}>
                  <Card className="h-100 product-item-card text-center p-4">
                    <Card.Img 
                      variant="top" 
                      src={product.prod_img ? `${MEDIA_BASE_URL}${product.prod_img}` : "https://via.placeholder.com/300x200"}
                      onError={handleImageError}
                    />
                    <Card.Body>
                      <Card.Title as="h4" className="fw-bold">{product.prod_title}</Card.Title>
                      <Card.Text className="text-muted small">
                        {product.prod_desc}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Products;