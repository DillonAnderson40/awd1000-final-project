import { useState, useEffect } from "react";
import StockCard from "../components/StockCard";

export default function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(saved);
  }, []);

  function deleteStock(id) {
    const updated = stocks.filter((s) => s.id !== id);
    setStocks(updated);
    localStorage.setItem("stocks", JSON.stringify(updated));
  }

  const filtered = stocks.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.ticker.toLowerCase().includes(q) ||
      s.nickname.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container py-4 text-light">
      <h2>Your Watchlist</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control bg-dark text-light border-secondary"
          placeholder="Search by ticker or nickname..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filtered.length === 0 ? (
          <p>No stocks added yet.</p>
        ) : (
          filtered.map((stock) => (
            <div className="col-md-4" key={stock.id}>
              <StockCard stock={stock} deleteStock={deleteStock} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

