import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
      <Link to="/" className="navbar-brand fs-3 fw-bold">
        QuantShift
      </Link>

      <div className="ms-auto">
        <Link to="/watchlist" className="btn btn-outline-light me-3">
          Watchlist
        </Link>
        <Link to="/add" className="btn btn-primary">
          Add Stock
        </Link>
      </div>
    </nav>
  );
}

