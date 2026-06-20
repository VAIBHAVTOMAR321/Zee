import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBuilding, FaUsers, FaLightbulb } from 'react-icons/fa';
import '../../about.css';
import AboutUs from  "../../assets/images/pms.jpg"

const About = () => {
  return (
    <div className="about-page">
      <header className="about-hero-section py-5">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-2">
          <h1 className="display-4 fw-bold mb-3">What we searve to our client</h1>
          <p className="lead fs-5 mb-0">
           About Our Company
          </p>
        </Container>
      </header>

<section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <img src={AboutUs} alt="about us" className="img-fluid rounded shadow-sm" />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold mb-4 story-title">Our Story</h2>
              <div className="title-bar"></div>
              <p className="text-muted">
               Zero Error Enterprises is Software Consulting and Development company based in dehradun. Company was established in 2020 with goal of custom software solutions for businesses and individuals so that they can show case their business and help increase productivity, reduce costs, and improve efficiency. Our Comapny Employ is highly skilled developers, designers, and engineers who are constantly learning and staying up-to-date with the latest technology trends and advancements.
Our team has develop too many application according to client needs.
              </p>
           
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title">Our Vision</h2>
            <p className="lead core-values-subtitle">To become a leading software development company that is recognized for its innovative and user friendly software solutions, exceptional customer service, and dedication to the professional growth and well-being ofits employees.</p>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3">
                    <FaBuilding size={40} className="text-primary" />
                  </div>
                  <Card.Title as="h4" className="fw-bold">Our Mision</Card.Title>
                  <Card.Text className="text-muted small">
                   To provide high-quality software development services to our clients while fostering a culture of creativity,collaboration, and continuous learning among our employees.
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