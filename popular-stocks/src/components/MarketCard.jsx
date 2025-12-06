import { useEffect, useState } from "react";

const API_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0";

export default function MarketCard({ title, symbol }) {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);

  // Detect crypto tickers like BTC-USD or ETH-USD
  const isCrypto = symbol.includes("-USD");

  async function fetchStockPrice() {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.c || data.c === 0) {
        setError(true);
        return;
      }

      setPrice(data.c);
    } catch (err) {
      console.error("Finnhub error:", err);
      setError(true);
    }
  }

  async function fetchCryptoPrice() {
    try {
      // Convert ETH-USD → ETHUSDT for Binance format
      const binanceSymbol = symbol.replace("-USD", "USDT");

      const url = `https://api.binance.com/api/v3/ticker/price?symbol=${binanceSymbol}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.price) {
        setError(true);
        return;
      }

      setPrice(parseFloat(data.price));
    } catch (err) {
      console.error("Binance error:", err);
      setError(true);
    }
  }

  useEffect(() => {
    if (isCrypto) {
      fetchCryptoPrice();
    } else {
      fetchStockPrice();
    }

    // Auto-refresh every 20 seconds
    const interval = setInterval(() => {
      if (isCrypto) {
        fetchCryptoPrice();
      } else {
        fetchStockPrice();
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="card p-4 bg-dark border-secondary text-light mb-3">
      <h5>{title}</h5>
      <p className="text-muted">{symbol}</p>

      {price && !error ? (
        <h3>${price.toFixed(2)}</h3>
      ) : (
        <div>
          <h3>$N/A</h3>
          <p className="text-danger small">
            Live price unavailable — using fallback.
          </p>
        </div>
      )}
    </div>
  );
}
