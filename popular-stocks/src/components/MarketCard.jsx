import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

// FINNHUB API KEY
const FINNHUB_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0";

export default function MarketCard({ title, symbol }) {
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let current = 0;
      let previous = 0;

      // -------------------------------------
      // 1) STOCKS + ETFs  (Finnhub Quote only)
      // -------------------------------------
      if (!symbol.startsWith("BINANCE:")) {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
        );
        const data = await res.json();

        current = data.c || 0;
        previous = data.pc || 0;

        setPrice(current);
        setChange(previous ? ((current - previous) / previous) * 100 : 0);

        // Stocks DO NOT get sparklines → empty
        setHistory([]);
      }

      // -------------------------------------
      // 2) CRYPTO (Finnhub Candle API)
      // -------------------------------------
      else {
        const url = `https://finnhub.io/api/v1/crypto/candle?symbol=${symbol}&resolution=D&count=14&token=${FINNHUB_KEY}`;

        const histRes = await fetch(url);
        const hist = await histRes.json();

        // Finnhub returns:
        // { c: [], h: [], l: [], o: [], s: "ok", t: [] }
        if (hist.s === "ok" && Array.isArray(hist.c)) {
          const closes = hist.c;

          setHistory(closes);

          current = closes[closes.length - 1];
          previous = closes[closes.length - 2];

          setPrice(current);
          setChange(previous ? ((current - previous) / previous) * 100 : 0);
        } else {
          console.warn("Bad Finnhub crypto response:", hist);
          setHistory([]);
        }
      }
    } catch (err) {
      console.error("MarketCard error:", err);
    }
  }

  return (
    <div className="market-card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">${price.toLocaleString()}</p>
        <p className={`card-change ${change >= 0 ? "green" : "red"}`}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </p>
      </div>

      {/* CRYPTO SPARKLINE ONLY */}
      {history.length > 0 && (
        <div className="sparkline-wrapper">
          <Sparklines data={history} width={140} height={60} margin={5}>
            <SparklinesLine
              color={change >= 0 ? "#4caf50" : "#ff4444"}
              style={{
                strokeWidth: 2.5,
                fill: change >= 0 ? "rgba(76, 175, 80, 0.18)" : "rgba(255, 68, 68, 0.18)",
              }}
            />
          </Sparklines>
        </div>
      )}
    </div>
  );
}

