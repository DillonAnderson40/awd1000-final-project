import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

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

      /* ===============================================
         1) PRICE — Finnhub supports crypto & stocks
      =============================================== */
      const quoteRes = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
      );
      const q = await quoteRes.json();

      current = q.c || 0;
      previous = q.pc || 0;

      setPrice(current);
      setChange(previous ? ((current - previous) / previous) * 100 : 0);

      /* ===============================================
         2) SPARKLINE — Yahoo Finance (via backend proxy)
      =============================================== */
      const sparkRes = await fetch(`/spark?symbol=${symbol}`);
      const sparkData = await sparkRes.json();

      if (Array.isArray(sparkData)) {
        setHistory(sparkData.filter((v) => v !== null));
      } else {
        console.warn("Spark invalid:", sparkData);
        setHistory([]);
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

      {history.length > 0 && (
        <div className="sparkline-wrapper">
          <Sparklines data={history} width={120} height={40} margin={5}>
            <SparklinesLine
              color={change >= 0 ? "#4caf50" : "#ff4d4d"}
              style={{ strokeWidth: 2 }}
            />
          </Sparklines>
        </div>
      )}
    </div>
  );
}

