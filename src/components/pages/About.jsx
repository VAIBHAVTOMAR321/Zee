import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../about.css';
import AboutUs from  "../../assets/images/pms.jpg"

const About = () => {
  return (
    <div className="about-page">
      <header className="about-hero-section py-5">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-2">
<h1 className="display-4 fw-bold mb-3">Zero Error Enterprises</h1>
          <p className="lead fs-5 mb-0">
            Software Consulting and Development company based in Dehradun.
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

      {/* Vision & Mission Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <Card.Body>
                  <Card.Title as="h3" className="fw-bold mb-3">Our Vision</Card.Title>
                  <Card.Text className="text-muted">
                    To become a leading software development company that is recognized for its innovative and user friendly software solutions, exceptional customer service, and dedication to the professional growth and well-being of its employees.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <Card.Body>
                  <Card.Title as="h3" className="fw-bold mb-3">Our Mission</Card.Title>
                  <Card.Text className="text-muted">
                    To provide high-quality software development services to our clients while fostering a culture of creativity, collaboration, and continuous learning among our employees.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title">Our Services</h2>
            <p className="lead core-values-subtitle">Comprehensive software solutions for your business needs.</p>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">Software Development</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">Website Development</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">Mobile Application Development</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">Testing & QA</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">Application Services</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">UX/UI Design</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">IT Consulting</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">AI Gadgets & Data Analytics</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center p-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title as="h4" className="fw-bold">Digital Marketing & Portal Development</Card.Title>
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