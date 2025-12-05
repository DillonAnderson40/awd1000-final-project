import { useState, useEffect } from "react";
import StockCard from "../components/StockCard";

export default function Watchlist() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("stocks");
    if (saved) {
      setStocks(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="container">
      <h2 className="text-white mb-4">Your Watchlist</h2>

      {stocks.length === 0 ? (
        <p className="text-secondary">No stocks added yet.</p>
      ) : (
        <div className="row">
          {stocks.map(stock => (
            <div className="col-md-4 mb-3" key={stock.id}>
              <StockCard stock={stock} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

