import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
      <Link to="/" className="navbar-brand fs-3 fw-bold">
        QuantShift
      </Link>

      <div className="ms-auto">

        {/* Watchlist */}
        <Link to="/watchlist" className="btn btn-outline-light me-3">
          <i className="fa-solid fa-list me-2"></i>
          Watchlist
        </Link>

        {/* WallStreetBets Button */}
        <Link to="/wallstreetbets" className="btn btn-warning me-3">
          <i className="fa-brands fa-reddit-alien me-2"></i>
          WSB Feed
        </Link>

        {/* Add Stock */}
        <Link to="/add" className="btn btn-primary">
          <i className="fa-solid fa-plus me-2"></i>
          Add Stock
        </Link>

      </div>
    </nav>
  );
}

