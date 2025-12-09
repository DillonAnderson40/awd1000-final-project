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

  /* ===========================================================
     SAFE JSON PARSER — Prevents crashes when Yahoo returns HTML
  =========================================================== */
  async function safeJson(res) {
    try {
      const text = await res.text();

      // If backend returned HTML → stop crash
      if (text.trim().startsWith("<")) {
        console.warn("⚠ Invalid (HTML) response received:", text.slice(0, 80));
        return null;
      }

      return JSON.parse(text);
    } catch (err) {
      console.warn("⚠ Failed to parse JSON:", err);
      return null;
    }
  }

  /* ===========================================================
     MAIN FETCH FUNCTION
  =========================================================== */
  async function fetchData() {
    try {
      let current = 0;
      let previous = 0;

      /* ======================================================
         A) STOCKS — FINNHUB PRICE + YAHOO SPARKLINE
      ====================================================== */
      if (!symbol.startsWith("YAHOO:")) {
        const quoteRes = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
        );
        const q = await safeJson(quoteRes);

        if (!q) {
          console.warn(`⚠ Finnhub returned invalid quote for ${symbol}`);
          return;
        }

        current = q.c || 0;
        previous = q.pc || 0;

        setPrice(current);
        setChange(previous ? ((current - previous) / previous) * 100 : 0);

        // Sparkline
        const sparkRes = await fetch(`https://quantshift-backend.onrender.com/spark?symbol=${symbol}`);
        const spark = await safeJson(sparkRes);

        if (Array.isArray(spark)) {
          setHistory(spark.filter((v) => typeof v === "number"));
        } else {
          console.warn("⚠ Sparkline invalid:", spark);
          setHistory([]);
        }
      }

      /* ======================================================
         B) CRYPTO — YAHOO PRICE + SPARKLINE 
      ====================================================== */
      else {
        const pair = symbol.replace("YAHOO:", "");

        const histRes = await fetch(`https://quantshift-backend.onrender.com/spark?symbol=${pair}`);
        const hist = await safeJson(histRes);

        if (Array.isArray(hist) && hist.length > 2) {
          const closes = hist.filter((v) => typeof v === "number");

          current = closes[closes.length - 1];
          previous = closes[closes.length - 2];

          setPrice(current);
          setChange(previous ? ((current - previous) / previous) * 100 : 0);
          setHistory(closes);
        } else {
          console.warn(`⚠ Invalid crypto history for: ${pair}`);
          setHistory([]);
        }
      }
    } catch (err) {
      console.error("MarketCard error:", err);
    }
  }

  /* ===========================================================
     RENDER
  =========================================================== */
  return (
    <div className="market-card">
      <div>
        <h3 className="card-title">{title}</h3>
        <p className="card-price">${price.toLocaleString()}</p>

        <p className={`card-change ${change >= 0 ? "green" : "red"}`}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </p>
      </div>

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

