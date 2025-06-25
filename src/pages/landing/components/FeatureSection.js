import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { features } from './example-landing-data';
import "../styles/feature-section.css"


const FeatureSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFeatures = features.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container className="feature-section mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold">Dịch vụ & Sản phẩm nổi bật</h2>
          <p className="text-muted">
            Những lựa chọn phổ biến nhất của chúng tôi được các cặp đôi yêu thích
          </p>
        </div>
        <a href="#" className="text-danger fw-semibold">
          Xem tất cả &rarr;
        </a>
      </div>
      <div className="mb-3 d-flex justify-content-end align-items-center" style={{ position: 'relative' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm dịch vụ nổi bật..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ maxWidth: 350, paddingLeft: 12, paddingRight: 32 }}
        />
        <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none', fontSize: 18 }}>
          <i className="bi bi-search"></i>
        </span>
      </div>
      <Row className="gy-4 gx-4">
        {filteredFeatures.map((item) => (
          <Col md={6} lg={3} className="mb-4" key={item.id}>
            <Card className="feature-card h-100 shadow-sm border-0">
              <div className="image-container">
                <Card.Img variant="top" src={item.image} className="feature-img" />
                <Badge bg="light" text="dark" className="position-absolute top-0 start-0 m-2">
                  {item.tag}
                </Badge>

              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-semibold feature-card-title">{item.title}</Card.Title>
                  <div className="text-muted mb-2">
                    <i className="bi bi-star-fill text-warning"></i>{' '}
                    {item.rating} ({item.reviews} reviews)
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">{item.price}</span>
                  <a href="#" className="text-danger small">Xem chi tiết</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeatureSection;