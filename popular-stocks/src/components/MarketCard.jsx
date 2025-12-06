import { useEffect, useState } from "react";

const API_KEY = "d4p1lj1r01qjpnb03esgd4plj1r01qjpnb03et0";

export default function MarketCard({ symbol, name }) {
  const [price, setPrice] = useState(null);
  const [changePercent, setChangePercent] = useState(null);

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 15000);
    return () => clearInterval(interval);
  }, [symbol]);

  async function fetchQuote() {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.c) return;

      const pct = ((data.c - data.pc) / data.pc) * 100;

      setPrice(data.c);
      setChangePercent(pct);
    } catch (err) {
      console.error("MarketCard error:", err);
    }
  }

  const isUp = changePercent > 0;
  const color = isUp ? "#00C805" : "#FF3B30";

  return (
    <div
      className="p-3 rounded shadow-sm"
      style={{
        background: "#111",
        border: `1px solid ${color}40`,
        minWidth: "180px",
      }}
    >
      <h5 className="text-light mb-1">{name}</h5>
      <p className="text-secondary">{symbol}</p>

      <h3 className="text-light mb-0">${price ? price.toFixed(2) : "…"}</h3>

      {changePercent !== null && (
        <p style={{ color }}>
          {isUp ? "▲" : "▼"} {changePercent.toFixed(2)}%
        </p>
      )}
    </div>
  );
}
