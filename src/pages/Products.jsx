import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

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
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
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
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
