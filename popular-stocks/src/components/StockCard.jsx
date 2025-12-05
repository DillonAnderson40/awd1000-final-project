import { Link } from "react-router-dom";

export default function StockCard({ stock, onDelete }) {
  return (
    <div className="card bg-dark text-light p-3 border-secondary h-100 d-flex flex-column">
      <h4>{stock.ticker}</h4>
      <p className="text-secondary">{stock.nickname}</p>
      <p className="mb-1">
        <strong>Target:</strong> ${stock.targetPrice}
      </p>

      <small className="text-muted">
        Added: {new Date(stock.dateAdded).toLocaleDateString()}
      </small>

      <div className="mt-3 d-flex gap-2 pt-3">
        <Link to={`/edit/${stock.id}`} className="btn btn-warning btn-sm">
            <i className="fa-solid fa-pen-to-square me-2"></i>
            Edit
        </Link>

        <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(stock.id)}
        >
            <i className="fa-solid fa-trash me-2"></i>
            Delete
        </button>
    </div>
    </div>
  );
}
