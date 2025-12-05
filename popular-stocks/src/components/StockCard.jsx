import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const API_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0";

export default function StockCard({ stock, onDelete }) {
  const [currentPrice, setCurrentPrice] = useState(null);

  const category = stock.category || "stock"; // default category

  // TEMP: simulate price values until you want API integration
  useEffect(() => {
  async function fetchPrice() {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${API_KEY}`
      );
      const data = await res.json();

      if (data.c) {
        setCurrentPrice(Number(data.c).toFixed(2));
        setPrevClose(Number(data.pc).toFixed(2));
      } else {
        const fallback = (
          Number(stock.targetPrice) * (0.8 + Math.random() * 0.6)
        ).toFixed(2);
        setCurrentPrice(fallback);
      }
    } catch (err) {
      const fallback = (
        Number(stock.targetPrice) * (0.8 + Math.random() * 0.6)
      ).toFixed(2);
      setCurrentPrice(fallback);
    }
  }

  // Fetch immediately on load
  fetchPrice();

  // Auto-refresh every 15 seconds
  const interval = setInterval(() => {
    fetchPrice();
  }, 15000); // 15000 ms = 15 seconds

  // Cleanup interval when component unmounts
  return () => clearInterval(interval);

}, [stock.ticker, stock.targetPrice]);



  const targetReached =
  currentPrice && Number(currentPrice) >= Number(stock.targetPrice);


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

