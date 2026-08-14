import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "../css/TrendingCollection.css";

const products = [
  {
    id: 1,
    name: "Black Hoodie",
    price: "Rs 4,999",
    category: "Hoodies",
    image: "https://lachicpick.in/wp-content/uploads/2023/01/683-1.png",
  },
  {
    id: 2,
    name: "White T-Shirt",
    price: "Rs 2,299",
    category: "T-Shirts",
    image: "https://cdn.pixabay.com/photo/2024/02/06/18/10/ai-generated-8557635_1280.jpg",
  },
  {
    id: 3,
    name: "Blue Jeans",
    price: "Rs 3,799",
    category: "Jeans",
    image: "https://i5.walmartimages.com/seo/Black-Friday-Clearance-Sale-Deal-Aloohaidyvio-No-Boundaries-Wide-Leg-Jeans-Woman-Stretchy-Baggy-High-Waisted-Trendy-Straight-Casual-Denim-Pants_0d8b9627-c9bc-4a79-ac5f-156b56c7f1f7.d2620930f0ebe9e0b8dcfb486d94a05d.jpeg",
  },
  {
    id: 4,
    name: "Bomber Jacket",
    price: "Rs 6,999",
    category: "Jackets",
    image: "https://hips.hearstapps.com/hmg-prod/images/bomber-jackets-women-otherstories-6629313bedc80.png?crop=0.575xw:0.690xh;0.214xw,0.136xh&resize=640:*",
  },
  {
    id: 5,
    name: "Grey Hoodie",
    price: "Rs 5,299",
    category: "Hoodies",
    image: "https://i.pinimg.com/originals/5b/92/f8/5b92f843a613f9188d355fb5e12e1115.jpg",
  },
  {
    id: 6,
    name: "Oversized Tee",
    price: "Rs 2,999",
    category: "T-Shirts",
    image: "https://i.pinimg.com/originals/b9/79/d7/b979d75c371fda486b64abbf019f6b4c.jpg",
  },
];

function TrendingCollection() {

  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((item) => item.category === filter);

  return (
    <Container className="my-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="text-white">Trending Collection</h2>

        <Button variant="outline-warning">
          View All
        </Button>

      </div>

      <div className="filter-buttons mb-4">

        {["All", "Hoodies", "T-Shirts", "Jeans", "Jackets"].map((item) => (

          <Button
            key={item}
            className={`me-2 mb-2 ${
              filter === item ? "active-btn" : ""
            }`}
            variant="outline-warning"
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>

        ))}

      </div>

      <Row className="g-4">

        {filteredProducts.map((item) => (

          <Col lg={3} md={6} sm={6} xs={12} key={item.id}>

            <Card className="product-card border-0">

              <div className="product-image">

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
                  Add To Cart
                </Button>

              </Card.Body>

            </Card>

          </Col>

        ))}

      </Row>

    </Container>
  );
}

export default TrendingCollection;