import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold">FakeStore CRUD App</h1>

      <p className="lead mt-3">
        Manage products with full CRUD functionality using React and APIs.
      </p>

      <div className="mt-4">
        <Link to="/products" className="btn btn-primary me-2">
          Browse Products
        </Link>

        <Link to="/add-product" className="btn btn-outline-dark">
          Add Product
        </Link>
      </div>
    </div>
  );
}

export default Home;
