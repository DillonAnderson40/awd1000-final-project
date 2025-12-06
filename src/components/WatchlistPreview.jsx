import { useEffect, useState } from "react";
import { loadStocks } from "../utils/localStorage";

export default function WatchlistPreview() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    setStocks(loadStocks());
  }, []);

  return (
    <div className="p-3 rounded" style={{ background: "#111" }}>
      {stocks.length === 0 && (
        <p className="text-secondary">No stocks added yet.</p>
      )}

      {stocks.map(st => (
        <div
          key={st.id}
          className="d-flex justify-content-between py-2 border-bottom border-secondary"
        >
          <span className="text-light">{st.ticker}</span>
          <span className="text-secondary">→</span>
        </div>
      ))}
    </div>
  );
}
