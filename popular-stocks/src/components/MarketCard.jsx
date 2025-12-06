import { useEffect, useState } from "react";

export default function MarketCard({ title, ticker, isCrypto = false }) {
  const [price, setPrice] = useState(null);
  const [percent, setPercent] = useState(null);
  const [change, setChange] = useState(null);

  const API_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0";

  useEffect(() => {
    if (isCrypto) {
      fetchCryptoPrice();
    } else {
      fetchStockPrice();
    }
  }, []);

  // -------------------------
  // FETCH STOCK PRICE (FINNHUB)
  // -------------------------
  async function fetchStockPrice() {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data || !data.c) {
        console.warn("MarketCard API returned unexpected data:", data);
        return;
      }

      const current = data.c;
      const diff = data.c - data.pc;
      const pct = (diff / data.pc) * 100;

      setPrice(current);
      setChange(diff);
      setPercent(pct);
    } catch (err) {
      console.error("Stock API error:", err);
    }
  }

  // -------------------------
  // FETCH CRYPTO (FALLBACK MOCK)
  // -------------------------
  async function fetchCryptoPrice() {
    try {
      // Mock fallback for dashboard demonstration
      const mockPrices = {
        BTCUSD: { price: 48000, change: 120, percent: 0.25 },
        ETHUSD: { price: 2500, change: -15, percent: -0.60 },
      };

      const key = ticker.replace("-", "").toUpperCase(); // BTC-USD → BTCUSD
      const asset = mockPrices[key];

      if (!asset) {
        console.warn("Crypto fallback unavailable:", ticker);
        setPrice(0);
        setChange(null);
        setPercent(null);
        return;
      }

      setPrice(asset.price);
      setChange(asset.change);
      setPercent(asset.percent);
    } catch (err) {
      console.error("Crypto price error:", err);
    }
  }

  // -------------------------
  // FIX NaN or undefined values
  // -------------------------
  const safePrice = price ?? 0;

  const safePercent =
    percent !== null && !isNaN(percent) ? percent : null;

  const safeChange =
    change !== null && !isNaN(change) ? change : null;

  const trendColor =
    safePercent === null ? "gray" : safePercent >= 0 ? "lime" : "red";

  return (
    <div
      className="p-3 mb-3 rounded bg-dark text-light"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <h5 className="mb-1">{title}</h5>
      <small className="text-muted">{ticker}</small>

      <div className="mt-2">
        <h4>${safePrice.toLocaleString()}</h4>

        {/* % Change Section */}
        {safePercent !== null ? (
          <div style={{ color: trendColor }}>
            {safePercent >= 0 ? "+" : ""}
            {safePercent.toFixed(2)}%{" "}
            ({safeChange >= 0 ? "+" : ""}
            {safeChange?.toFixed(2)})
          </div>
        ) : (
          <div className="text-danger">
            Live price unavailable — using fallback.
          </div>
        )}
      </div>
    </div>
  );
}

