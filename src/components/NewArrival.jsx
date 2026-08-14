import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "../css/NewArrival.css";

const products = [
  {
    id: 1,
    name: "Oversized Hoodie",
    price: "Rs 4,999",
    image: "https://tse2.mm.bing.net/th/id/OIP.IUr-1Tzm-8BuNtZRAszGfQHaKD?r=0&pid=Api&h=220&P=0",
    sale: "20% OFF",
  },
  {
    id: 2,
    name: "Printed T-Shirt",
    price: "Rs 2,499",
    image: "https://tse3.mm.bing.net/th/id/OIP.3DcLBdXH6QqlgsbQ2O9SoAHaHa?r=0&pid=Api&h=220&P=0",
    sale: "NEW",
  },
  {
    id: 3,
    name: "Denim Jeans",
    price: "Rs 3,799",
    image: "https://i.pinimg.com/originals/24/23/d7/2423d7adb3456b95d3b08752b668dbbf.jpg",
    sale: "15% OFF",
  },
  {
    id: 4,
    name: "Bomber Jacket",
    price: "Rs 6,999",
    image: "https://cdn.luxe.digital/media/2021/01/07115921/best-men-bomber-jacket-Alpha-Industries-MA-1-review-luxe-digital%402x.jpg",
    sale: "HOT",
  },
];

function NewArrival() {
  return (
    <Container className="my-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">New Arrivals</h2>

        <Button variant="outline-warning">
          View All
        </Button>
      </div>

      <Row className="g-4">

        {products.map((item) => (
          <Col lg={3} md={6} sm={6} xs={12} key={item.id}>

            <Card className="product-card border-0">

              <div className="product-image">

                <Badge bg="warning" text="dark" className="sale-badge">
                  {item.sale}
                </Badge>

                <FaHeart className="wishlist-icon" />

                <Card.Img src={item.image} />

              </div>

              <Card.Body>

                <Card.Title>{item.name}</Card.Title>

                <div className="rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <h5>{item.price}</h5>

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