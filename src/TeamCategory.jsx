import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './products.css'; // Reusing products CSS for similar card styling

const TeamCategory = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  const MEDIA_BASE_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend";

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/ourteam-items/");
        if (response.data.success) {
          const filteredMembers = response.data.data.filter(
            member => member.category.toLowerCase() === category.toLowerCase()
          );
          setTeamMembers(filteredMembers);
        } else {
          setError("Failed to fetch team members.");
        }
      } catch (err) {
        setError("An error occurred while fetching team members.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [category]);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
  };

  return (
    <div className="products-page">
      <header className="products-hero-section py-5">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-2">
          <h1 className="display-4 fw-bold mb-3">{category} Team</h1>
          <p className="lead fs-5 mb-0">
            Meet the professionals in the {category} department.
          </p>
        </Container>
      </header>

      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title">Our {category} Team</h2>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading Team Members...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Row className="g-4">
              {teamMembers.map(member => (
                <Col lg={4} md={6} key={member.id}>
                  <Card className="h-100 product-item-card text-center p-4">
                    <Card.Img variant="top" src={member.image ? `${MEDIA_BASE_URL}${member.image}` : "https://via.placeholder.com/300x300"} onError={handleImageError} style={{ aspectRatio: '1 / 1', objectFit: 'cover' }} />
                    <Card.Body>
                      <Card.Title as="h4" className="fw-bold">{member.full_name}</Card.Title>
                      <Card.Text className="text-muted">{member.designation}</Card.Text>
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

export default TeamCategory;