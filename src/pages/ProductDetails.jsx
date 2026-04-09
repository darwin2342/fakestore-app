import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
        setError("Could not load product details.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  async function handleDelete() {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      alert("Product deleted successfully!");
      navigate("/products");
    } catch (err) {
      console.log(err);
      alert("Could not delete product.");
    }
  }

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
    <div className="container mt-4">
      <h1 className="mb-4 text-center">{product.title}</h1>
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title} className="img-fluid" />
          <p>
            <strong>Category:</strong> {product.category}
          </p>
        </div>
        <div className="col-md-6">
          <p>{product.description}</p>
          <p className="lead">${product.price.toFixed(2)}</p>

          <div className="d-flex gap-2 mt-3">
            <Link to="/products" className="btn btn-secondary">
              Back to Products
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => setShowModal(true)}
            >
              Delete Product
            </button>
            <Link
              to={`/edit-product/${product.id}`}
              className="btn btn-primary"
            >
              Edit Product
            </Link>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductDetails;
