import { Link } from "react-router-dom";

export default function StockCard({ stock }) {
  return (
    <div className="card bg-dark text-light p-3 border-secondary">
      <h4>{stock.ticker}</h4>
      <p className="text-secondary">{stock.nickname}</p>
      <p className="mb-1">
        <strong>Target:</strong> ${stock.targetPrice}
      </p>

      <small className="text-muted">
        Added: {new Date(stock.dateAdded).toLocaleDateString()}
      </small>

      <div className="mt-3 d-flex justify-content-between">
        <Link to={`/edit/${stock.id}`} className="btn btn-warning btn-sm">
          Edit
        </Link>

        <button className="btn btn-danger btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
}
