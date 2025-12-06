import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

// Finnhub API key for current price
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
      let curr = 0;
      let prev = 0;

      /* =====================================================
         STOCKS & ETFs — FINNHUB for price / YAHOO for sparkline
      ===================================================== */
      if (!symbol.startsWith("BINANCE:")) {
        // Get real-time stock price from Finnhub
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
        );
        const data = await res.json();

        curr = data.c || 0;
        prev = data.pc || 0;

        setPrice(curr);
        setChange(prev ? ((curr - prev) / prev) * 100 : 0);

        // Now get YAHOO sparkline through your backend proxy
        const spark = await fetch(`/spark?symbol=${symbol}`);
        const sparkData = await spark.json();

        if (Array.isArray(sparkData)) {
          setHistory(sparkData);
        } else {
          console.warn("Yahoo sparkline returned unexpected data:", sparkData);
          setHistory([]);
        }
      }

      /* =====================================================
         CRYPTO — Binance (through backend proxy)
      ===================================================== */
      else {
        const pair = symbol.replace("BINANCE:", "");

        const hist = await fetch(`/binance?symbol=${pair}&limit=7`);
        const histData = await hist.json();

        if (Array.isArray(histData)) {
          const closes = histData.map((row) => parseFloat(row[4]));

          curr = closes[closes.length - 1];
          prev = closes[closes.length - 2];

          setPrice(curr);
          setChange(prev ? ((curr - prev) / prev) * 100 : 0);
          setHistory(closes);
        } else {
          console.warn("Binance invalid response:", histData);
          setHistory([]);
        }
      }
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

      {/* SPARKLINE — only shown if history exists */}
      {history.length > 0 && (
        <div className="sparkline-wrapper">
          <Sparklines data={history} width={140} height={60} margin={5}>
            <SparklinesLine
              color={change >= 0 ? "#4caf50" : "#ff4d4d"}
              style={{
                strokeWidth: 2.6,
              }}
            />
          </Sparklines>
        </div>
      )}
    </div>
  );
}

