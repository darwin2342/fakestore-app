import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-4">Loading products...</h2>;
  }

  if (error) {
    return <h2 className="text-center mt-4">{error}</h2>;
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Products</h1>

      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{
                  height: "250px",
                  objectFit: "contain",
                  padding: "1rem",
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  variant="primary"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
