import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaBriefcase } from 'react-icons/fa';
import '../../services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MEDIA_BASE_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-service/");
        console.log("zservices API Response:", response.data);
        if (response.data.success) {
          setServices(response.data.data);
        } else {
          setError("Failed to fetch services.");
        }
      } catch (err) {
        setError("An error occurred while fetching services.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070";
  };

  return (
    <div className="services-page">
      <header className="services-hero-section py-5">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-2">
          <h1 className="display-4 fw-bold mb-3">Our Services</h1>
          <p className="lead fs-5 mb-0">
            Delivering excellence and value through our comprehensive solutions.
          </p>
        </Container>
      </header>

      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title">Our Services</h2>
            <p className="lead services-subtitle">Delivering excellence and value through our comprehensive solutions.</p>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading Services...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
              <Row className="g-4">
                {services.map(service => (
                  <Col lg={4} md={6} key={service.id}>
                    <Card className="h-100 service-item-card text-center p-4">
                      <Card.Img 
                        variant="top" 
                        src={service.service_img ? `${MEDIA_BASE_URL}${service.service_img}` : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"}
                        onError={handleImageError}
                        className="service-card-img"
                      />
                      <Card.Body>
                        {/* <div className="service-icon-wrapper mb-4">
                          <FaBriefcase size={40} />
                        </div> */}
                        <Card.Title as="h4" className="fw-bold">{service.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{service.sub_title}</Card.Subtitle>
                        <Card.Text className="small">
                          {service.desc}
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

export default Services;