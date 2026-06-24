import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../about.css';
import AboutUs from  "../../assets/images/pms.jpg";
import { FaEye, FaBullseye } from 'react-icons/fa';

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
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="about-image-container">
                <img src={AboutUs} alt="about us" className="img-fluid rounded shadow-sm about-story-image" />
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <h2 className="fw-bold mb-4 story-title">Our Story</h2>
              <div className="title-bar mx-auto"></div>
              <p className="text-muted text-justify">
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
              <div className="about-card p-4 text-center">
                <div className="about-icon-wrapper mx-auto mb-4">
                  <FaEye size={32} />
                </div>
                <h3 className="fw-bold mb-3">Our Vision</h3>
                <p className="text-muted text-justify">
                    To become a leading software development company recognized for its innovative and user-friendly software solutions, exceptional customer service, and dedication to the professional growth and well-being of its employees.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="about-card p-4 text-center">
                <div className="about-icon-wrapper mx-auto mb-4">
                  <FaBullseye size={32} />
                </div>
                <h3 className="fw-bold mb-3">Our Mission</h3>
                <p className="text-muted text-justify">
                    To provide high-quality software development services to our clients while fostering a culture of creativity, collaboration, and continuous learning among our employees.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    
    </div>
  );
};

export default About;