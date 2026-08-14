import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

import "../css/Features.css";

function Features() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      text: "Orders over $100",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      text: "100% Protected",
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      text: "7 Days Return",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Always Available",
    },
  ];

  return (
    <Container className="my-4">
      <Row className="g-3">
        {features.map((item, index) => (
          <Col lg={3} md={6} sm={6} xs={12} key={index}>
            <Card className="feature-card border-0">
              <Card.Body className="d-flex align-items-center">
                <div className="feature-icon">{item.icon}</div>

                <div className="ms-3">
                  <h6>{item.title}</h6>
                  <p>{item.text}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Features;