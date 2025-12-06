import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function MarketCard({ title, symbol }) {
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // Convert BINANCE:BTCUSDT → BTC-USD
      let yahooSymbol = symbol;
      if (symbol.startsWith("BINANCE:")) {
        yahooSymbol = symbol.replace("BINANCE:", "").replace("USDT", "-USD");
      }

      const res = await fetch(`/chart?symbol=${yahooSymbol}`);
      const data = await res.json();

      if (!data || !data.history) {
        console.warn("Invalid chart response:", data);
        return;
      }

      setPrice(data.current || 0);

      const pct =
        data.previous && data.current
          ? ((data.current - data.previous) / data.previous) * 100
          : 0;

      setChange(pct);
      setHistory(data.history);
    } catch (err) {
      console.error("MarketCard error:", err);
    }
  }

  return (
    <div className="market-card">
      <h3 className="card-title">{title}</h3>
      <p className="card-price">${price.toLocaleString()}</p>

      <p className={`card-change ${change >= 0 ? "green" : "red"}`}>
        {change >= 0 ? "+" : ""}
        {change.toFixed(2)}%
      </p>

      {/* Sparkline */}
      {history.length > 0 && (
        <div className="sparkline-wrapper">
          <Sparklines data={history} width={160} height={50} margin={5}>
            <SparklinesLine
              color={change >= 0 ? "#4caf50" : "#ff4d4d"}
              style={{ strokeWidth: 3 }}
            />
          </Sparklines>
        </div>
      )}
    </div>
  );
}

