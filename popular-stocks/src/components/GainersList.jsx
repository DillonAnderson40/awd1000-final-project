import { useEffect, useState } from "react";

const API_KEY = "d4p1lj1r01qjpnb03esgd4plj1r01qjpnb03et0";

export default function GainersList() {
  const [gainers, setGainers] = useState([]);

  useEffect(() => {
    load();
    const iv = setInterval(load, 20000);
    return () => clearInterval(iv);
  }, []);

  async function load() {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/scan/technical-indicator?symbol=AAPL&resolution=D&token=${API_KEY}`
      );
      // MOCK 3 gainers for the UI.
      setGainers([
        { symbol: "AAPL", pct: +2.15 },
        { symbol: "MSFT", pct: +1.98 },
        { symbol: "TSLA", pct: +1.45 },
      ]);
    } catch (err) {
      console.error("Gainers error:", err);
    }
  }

  return (
    <div className="p-3 rounded" style={{ background: "#111" }}>
      <h4 className="text-light mb-3">Top Gainers</h4>

      {gainers.map(g => (
        <div key={g.symbol} className="d-flex justify-content-between py-2">
          <span className="text-light">{g.symbol}</span>
          <span style={{ color: "#00C805" }}>+{g.pct}%</span>
        </div>
      ))}
    </div>
  );
}
