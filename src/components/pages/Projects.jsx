import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MEDIA_BASE_URL = "https://mahadevaaya.com/zeeproject/zeeproject_backend";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://mahadevaaya.com/zeeproject/zeeproject_backend/api/zee-project/");
        if (response.data.success) {
          setProjects(response.data.data);
        } else {
          setError("Failed to fetch projects.");
        }
      } catch (err) {
        setError("An error occurred while fetching projects.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1454165833767-027ff8af996a?auto=format&fit=crop&q=80&w=2070";
  };

  return (
    <div className="projects-page">
      <header className="projects-hero-section py-5">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-2">
          <h1 className="display-4 fw-bold mb-3">Our Projects</h1>
          <p className="lead fs-5 mb-0">
            A showcase of our commitment to innovation and quality.
          </p>
        </Container>
      </header>

      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title">Our Projects</h2>
            <p className="lead projects-subtitle">A showcase of our commitment to innovation and quality.</p>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading Projects...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Row className="g-4">
              {projects.map(project => (
                <Col lg={4} md={6} key={project.id}>
                  <Card className="h-100 project-item-card text-center p-4">
                    <div className="project-img-container">
                      <Card.Img 
                        variant="top" 
                        src={project.pro_img ? `${MEDIA_BASE_URL}${project.pro_img}` : "https://via.placeholder.com/400x300"}
                        onError={handleImageError}
                      />
                      <div className="project-hover-overlay">
                        <h5 className="text-white">{project.pro_title}</h5>
                        <p className="text-white-50 small">{project.pro_desc}</p>
                        {project.pro_link && (
                          <Button variant="outline-light" size="sm" href={project.pro_link} target="_blank" rel="noopener noreferrer">
                            View Project
                          </Button>
                        )}
                      </div>
                    </div>
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

export default Projects;