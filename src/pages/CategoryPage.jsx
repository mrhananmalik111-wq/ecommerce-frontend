import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap"; // Added missing imports
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa"; // Added missing imports
import { CATEGORIES } from "../constants/categories";
import "../css/NewArrival.css";

export default function CategoryPage() {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCategoryId = Number(categoryId);

  const selectedCategory = CATEGORIES.find(
    (category) => category.id === selectedCategoryId
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/getAllProducts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("📦 All Products:", data);

        if (response.ok) {
          const productList = data.products || data.data || [];
          setProducts(productList);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ FIXED: Filter products for selected category
  const filteredProducts = products.filter((product) => {
    // Check if product category matches by ID
    if (String(product.category) === String(selectedCategoryId)) {
      return true;
    }

    // Check if product category matches by name (case insensitive)
    if (
      selectedCategory?.name &&
      product.category?.trim().toLowerCase() ===
      selectedCategory.name.trim().toLowerCase()
    ) {
      return true;
    }

    return false;
  });

  console.log("🔢 URL Category ID:", selectedCategoryId);
  console.log("🏷️ Selected Category:", selectedCategory);
  console.log("🛍️ Filtered Products:", filteredProducts);

  // ✅ Added loading state
  if (loading) {
    return (
      <Container className="my-5 text-center text-white">
        <h3>Loading products...</h3>
      </Container>
    );
  }

  // ✅ Handle case when category doesn't exist
  if (!selectedCategory) {
    return (
      <Container className="my-5 text-center text-white">
        <h3>Category not found</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* ✅ Show category name instead of hardcoded "New Arrivals" */}
        <h2 className="text-white">{selectedCategory.name}</h2>
        <Button variant="outline-warning">View All</Button>
      </div>

      {/* ✅ Show message if no products in category */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-white">
          <h4>No products found in this category</h4>
        </div>
      ) : (
        <Row className="g-4">
          {filteredProducts.map((product) => (
            <Col lg={3} md={6} sm={6} xs={12} key={product.id || product._id}>
              <Card className="product-card border-0">
                <div className="product-image">
                  {product.sale && (
                    <Badge bg="warning" text="dark" className="sale-badge">
                      {product.sale}
                    </Badge>
                  )}
                  <FaHeart className="wishlist-icon" />
                  <Card.Img 
                    src={`http://localhost:5000${product.images?.[0] || ''}`} 
                    alt={product.name} 
                  />
                </div>

                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>

                  <div className="rating">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>

                  <h5>${product.price}</h5>

                  <Button variant="warning" className="w-100 mt-3">
                    <FaShoppingCart className="me-2" />
                    Add to Cart
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