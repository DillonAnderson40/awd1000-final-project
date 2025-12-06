import { useEffect, useState } from "react";

// Your Finnhub API key
const API_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0";

export default function MarketCard({ title, symbol, subtitle }) {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);

  async function loadPrice() {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );

      const data = await res.json();

      // If Finnhub returns an error object instead of price data
      if (!data.c) {
        console.warn("MarketCard API returned unexpected data:", data);
        setError(true);
        setPrice("N/A");
        return;
      }

      setPrice(data.c);
      setError(false);
    } catch (err) {
      console.error("MarketCard fetch error:", err);
      setError(true);
      setPrice("N/A");
    }
  }

  useEffect(() => {
    loadPrice();

    // Auto-refresh every 20 seconds
    const interval = setInterval(loadPrice, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-dark text-light p-3 mb-3 shadow-sm border rounded">
      <h5 className="mb-1">{title}</h5>
      <div className="text-muted small">{subtitle}</div>

      <div className="mt-3">
        {price === null ? (
          <h3>$...</h3>
        ) : (
          <h3>${price}</h3>
        )}
      </div>

      {error && (
        <div className="text-danger small mt-2">
          Live price unavailable — using fallback.
        </div>
      )}
    </div>
  );
}
