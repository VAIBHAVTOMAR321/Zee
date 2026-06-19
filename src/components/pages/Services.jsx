import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaBriefcase } from 'react-icons/fa';
import '../../services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-service/");
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

  return (
    <div className="services-page">
      <header className="services-hero-section text-center text-white py-5">
        <Container>
          <h1 className="display-5 fw-bold">Our Services</h1>
          <p className="lead">
            Delivering excellence and value through our comprehensive solutions.
          </p>
        </Container>
      </header>

      <section className="py-5">
        <Container>
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
                  <Card className="h-100 service-item-card border-0 shadow-sm text-center p-4">
                    <Card.Body>
                      <div className="service-icon-wrapper mb-4">
                        <FaBriefcase size={40} />
                      </div>
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