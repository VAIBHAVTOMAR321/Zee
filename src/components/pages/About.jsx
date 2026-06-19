import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FaBuilding, FaUsers, FaLightbulb } from 'react-icons/fa';
import '../../about.css';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-hero-section text-center text-white py-5">
        <Container>
          <h1 className="display-5 fw-bold">About Zee Zero Enterprises</h1>
          <p className="lead">
            Pioneering strategic innovation and global excellence.
          </p>
        </Container>
      </header>

      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <Image 
                src="https://images.unsplash.com/photo-1522071823991-b5182991e38f?auto=format&fit=crop&q=80&w=2070" 
                fluid 
                rounded 
                className="shadow-lg"
              />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold">Our Story</h2>
              <p className="text-muted">
                Founded on the principles of integrity, innovation, and client-centricity, Zee Zero Enterprises has grown from a small consultancy to a global provider of comprehensive business solutions. We are dedicated to helping our clients navigate the complexities of the modern market.
              </p>
              <p className="text-muted">
                Our team of experts brings a wealth of experience from diverse industries, allowing us to deliver tailored strategies that drive growth, efficiency, and long-term success.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Core Values</h2>
            <p className="text-muted">The principles that guide our work and our partnerships.</p>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaBuilding size={40} className="text-primary" />
                  </div>
                  <Card.Title as="h4" className="fw-bold">Integrity</Card.Title>
                  <Card.Text className="text-muted small">
                    We uphold the highest standards of integrity in all of our actions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaUsers size={40} className="text-primary" />
                  </div>
                  <Card.Title as="h4" className="fw-bold">Client Commitment</Card.Title>
                  <Card.Text className="text-muted small">
                    We develop relationships that make a positive difference in our clients' lives.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaLightbulb size={40} className="text-primary" />
                  </div>
                  <Card.Title as="h4" className="fw-bold">Innovation</Card.Title>
                  <Card.Text className="text-muted small">
                    We are passionate about delivering innovative solutions to complex challenges.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;