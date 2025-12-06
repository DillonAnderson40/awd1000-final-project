import { useEffect, useState } from "react";

export default function MarketCard({ title, ticker }) {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [percent, setPercent] = useState(null);

  useEffect(() => {
    if (!ticker) return;
    fetchYahoo();
  }, [ticker]);

  async function fetchYahoo() {
    try {
      const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=price`;

      const res = await fetch(url);

      if (!res.ok) {
        console.error("Yahoo error:", res.status);
        return;
      }

      const json = await res.json();
      const quote = json?.quoteSummary?.result?.[0]?.price;

      if (!quote) {
        console.warn("Yahoo returned no price data:", json);
        return;
      }

      const marketPrice = quote.regularMarketPrice?.raw ?? 0;
      const diff = quote.regularMarketChange?.raw ?? 0;
      const pct = quote.regularMarketChangePercent?.raw ?? 0;

      setPrice(marketPrice);
      setChange(diff);
      setPercent(pct);
    } catch (err) {
      console.error("Yahoo fetch failed:", err);
    }
  }

  const trendColor =
    percent === null ? "gray" : percent >= 0 ? "#4caf50" : "#ff5252";

  return (
    <div
      className="p-3 mb-3 rounded bg-dark text-light"
      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <h5 className="mb-1">{title}</h5>
      <small className="text-muted">{ticker}</small>

      <div className="mt-2">
        <h4>${price?.toLocaleString() ?? "0"}</h4>

        {percent !== null ? (
          <div style={{ color: trendColor }}>
            {percent >= 0 ? "+" : ""}
            {percent.toFixed(2)}% ({change >= 0 ? "+" : ""}
            {change?.toFixed(2)})
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

