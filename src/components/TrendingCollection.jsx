import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { CATEGORIES } from "../constants/categories";
import "../css/TrendingCollection.css";

function TrendingCollection() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // ============================================
  // FETCH PRODUCTS
  // ============================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/getAllProducts"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        console.log("📦 Trending API Response:", data);

        // API se products
        setProducts(data.products || []);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ============================================
  // FILTER PRODUCTS
  // ============================================
  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => {
          const productCategory = String(
            product.category
          ).trim();

          // Category ID ko find karo
          const category = CATEGORIES.find(
            (cat) =>
              String(cat.id) === productCategory
          );

          // Example:
          // product.category = "7"
          // category.name = "Ladies Jeans"

          if (!category) {
            return false;
          }

          // "Ladies Jeans" -> "jeans"
          // "Gents Jeans" -> "jeans"

          return category.name
            .toLowerCase()
            .includes(filter.toLowerCase());
        });

  console.log("🔎 Current Filter:", filter);
  console.log("🛍️ All Products:", products);
  console.log("✅ Filtered Products:", filteredProducts);

  // ============================================
  // FILTER BUTTONS
  // ============================================
  const filterButtons = [
    "All",
    "Shirts",
    "Outfits",
    "Jacket",
    "Jeans",
    "Shoes",
    "Watches",
  ];

  return (
    <Container className="my-5">

      {/* Heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="text-white">
          Trending Collection
        </h2>

        <Button variant="outline-warning">
          View All
        </Button>

      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons mb-4">

        {filterButtons.map((item) => (
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

      {/* Loading */}
      {loading && (
        <div className="text-center text-white">
          <h4>Loading products...</h4>
        </div>
      )}

      {/* No Products */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center text-white">
          <h4>No products found.</h4>
        </div>
      )}

      {/* Products */}
      {!loading && filteredProducts.length > 0 && (
        <Row className="g-4">

          {filteredProducts.map((item) => (
            <Col
              lg={3}
              md={6}
              sm={6}
              xs={12}
              key={item._id}
            >

              <Card className="product-card border-0">

                {/* Image */}
                <div className="product-image">

                  <FaHeart className="wishlist-icon" />

                  {item.images?.length > 0 ? (
                    <Card.Img
                      src={`http://localhost:5000${item.images[0]}`}
                      alt={item.name}
                    />
                  ) : (
                    <div className="no-image">
                      No Image
                    </div>
                  )}

                </div>

                {/* Body */}
                <Card.Body>

                  <Card.Title>
                    {item.name}
                  </Card.Title>

                  {/* Rating */}
                  <div className="rating">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  {/* Price */}
                  <h5>
                    ${item.price}
                  </h5>

                  {/* Category */}
                  <p>
                    {CATEGORIES.find(
                      (cat) =>
                        String(cat.id) ===
                        String(item.category)
                    )?.name || item.category}
                  </p>

                  {/* Cart */}
                  <Button
                    variant="warning"
                    className="w-100 mt-3"
                  >
                    <FaShoppingCart className="me-2" />
                    Add To Cart
                  </Button>

                </Card.Body>

              </Card>

            </Col>
          ))}

        </Row>
      )}

    </Container>
  );
}

export default TrendingCollection;