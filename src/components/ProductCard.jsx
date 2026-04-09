import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: "250px", objectFit: "contain", padding: "1rem" }}
      />

      <Card.Body>
        <Card.Title style={{ fontSize: "1rem" }}>
          {product.title.slice(0, 40)}
        </Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Button
          as={Link}
          to={`/products/${product.id} `}
          variant="primary"
          className="mt-auto"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
