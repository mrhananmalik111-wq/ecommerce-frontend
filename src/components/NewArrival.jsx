import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../css/NewArrival.css";

function NewArrival() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getAllProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">New Arrivals</h2>
        <Button variant="outline-warning">View All</Button>
      </div>

      <Row className="g-4">
        {products.map((product) => (
          <Col lg={3} md={6} sm={6} xs={12} key={product.id || product._id}>
            <Card className="product-card border-0">
              <div className="product-image">
                <Badge bg="warning" text="dark" className="sale-badge">
                  {product.sale}
                </Badge>
                <FaHeart className="wishlist-icon" />
                <Card.Img src={`http://localhost:5000${product.images[0]}`} alt={product.name} />
              </div>

              <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <div className="rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <h5>{product.price}$</h5>

                <Button variant="warning" className="w-100 mt-3">
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default NewArrival;