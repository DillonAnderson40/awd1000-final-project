import { useEffect, useState } from "react";

const API_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0"; // your key

export default function MarketCard({ title, symbol }) {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [percent, setPercent] = useState(null);

  useEffect(() => {
    if (!symbol) return;
    fetchFinnhub();
  }, [symbol]);

  async function fetchFinnhub() {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
      const res = await fetch(url);

      if (!res.ok) {
        console.error("Finnhub error:", res.status);
        return;
      }

      const data = await res.json();

      if (!data || !data.c) {
        console.warn("Finnhub returned unexpected data:", data);
        return;
      }

      setPrice(data.c);       // current price
      setChange(data.d);      // difference
      setPercent(data.dp);    // percent
    } catch (err) {
      console.error("Failed to fetch Finnhub:", err);
    }
  }

  const trendColor = percent >= 0 ? "#4caf50" : "#ff5252";

  return (
    <div
      className="p-3 mb-3 rounded bg-dark text-light"
      style={{ border: "1px solid rgba(255,255,255,0.15)" }}
    >
      <h5 className="mb-1">{title}</h5>
      <small className="text-muted">{symbol}</small>

      <div className="mt-2">
        <h4>${price?.toLocaleString() ?? "0"}</h4>

        {percent != null ? (
          <div style={{ color: trendColor }}>
            {percent >= 0 ? "+" : ""}
            {percent?.toFixed(2)}% ({change >= 0 ? "+" : ""}
            {change?.toFixed(2)})
          </div>
        ) : (
          <div className="text-danger">Live price unavailable — using fallback.</div>
        )}
      </div>
    </div>
  );
}

