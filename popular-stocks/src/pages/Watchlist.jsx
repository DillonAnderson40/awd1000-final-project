import { useState, useEffect } from "react";
import StockCard from "../components/StockCard";
import SearchBar from "../components/SearchBar";

export default function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(saved);
  }, []);

  // DELETE A STOCK
  function handleDelete(id) {
    const updated = stocks.filter(stock => stock.id !== id);
    setStocks(updated);
    localStorage.setItem("stocks", JSON.stringify(updated));
  }

  return (
  <div className="container">
    <h2 className="text-white mb-4">Your Watchlist</h2>

    <SearchBar search={search} setSearch={setSearch} />

    {stocks.length === 0 ? (
      <p className="text-secondary">No stocks added yet.</p>
    ) : (
      <div className="row">
        {stocks
          .filter(stock => {
            const term = search.toLowerCase();
            return (
              stock.ticker.toLowerCase().includes(term) ||
              stock.nickname.toLowerCase().includes(term)
            );
          })
          .map(stock => (
            <div className="col-md-4 mb-3" key={stock.id}>
              <StockCard
                stock={stock}
                onDelete={handleDelete}
              />
            </div>
          ))}
      </div>
    )}
  </div>
);
}
