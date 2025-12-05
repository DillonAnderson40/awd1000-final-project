import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function StockCard({ stock, onDelete }) {
  const [currentPrice, setCurrentPrice] = useState(null);

  const category = stock.category || "stock"; // default category

  // TEMP: simulate price values until you want API integration
  useEffect(() => {
    const random = (
      Number(stock.targetPrice) * (0.8 + Math.random() * 0.6)
    ).toFixed(2);
    setCurrentPrice(random);
  }, [stock]);

  const targetReached = currentPrice >= stock.targetPrice;

  return (
    <div
      className={`card stock-card bg-dark text-light p-3 h-100 d-flex flex-column 
      ${targetReached ? "target-hit" : ""}`}
    >
      {/* Accent bar */}
      <div className={`accent-bar ${category}`}></div>

      {/* Header */}
      <h4 className="d-flex align-items-center">
        <i className="fa-solid fa-chart-line me-2"></i>
        {stock.ticker}
      </h4>

      <p className="text-secondary">{stock.nickname}</p>

      <p className="mb-1">
        <i className="fa-solid fa-bullseye me-2"></i>
        <strong>Target:</strong> ${stock.targetPrice}
      </p>

      <p className="mb-1">
        <i className="fa-solid fa-tag me-2"></i>
        <strong>Now:</strong> ${currentPrice ?? "—"}
      </p>

      <small className="text-muted d-flex align-items-center">
        <i className="fa-regular fa-clock me-2"></i>
        Added: {new Date(stock.dateAdded).toLocaleDateString()}
      </small>

      {/* Buttons */}
      <div className="mt-auto d-flex gap-2 pt-3">
        <Link to={`/edit/${stock.id}`} className="btn btn-warning btn-sm">
          <i className="fa-solid fa-pen-to-square me-1"></i> Edit
        </Link>

        <button
          className="btn btn-danger btn-sm delete-btn"
          onClick={() => onDelete(stock.id)}
        >
          <i className="fa-solid fa-trash me-1"></i> Delete
        </button>
      </div>
    </div>
  );
}

