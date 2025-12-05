import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">QuantShift</Link>

      <div>
        <Link to="/watchlist" className="btn btn-light mx-2">Watchlist</Link>
        <Link to="/add" className="btn btn-primary">Add Stock</Link>
      </div>
    </nav>
  );
}
