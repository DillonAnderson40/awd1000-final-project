import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

// Finnhub API KEY
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

      /* ======================================================
         A) STOCKS — FINNHUB PRICE + YAHOO SPARKLINE
      ====================================================== */
      if (!symbol.startsWith("YAHOO:")) {
        // ----- Price -----
        const quote = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
        );
        const q = await quote.json();

        current = q.c || 0;
        previous = q.pc || 0;

        setPrice(current);
        setChange(previous ? ((current - previous) / previous) * 100 : 0);

        // ----- Sparkline (Yahoo) -----
        const sparkRes = await fetch(`/spark?symbol=${symbol}`);
        const spark = await sparkRes.json();

        if (Array.isArray(spark)) {
          setHistory(spark.filter((v) => v !== null));
        } else {
          console.warn("Yahoo spark invalid:", spark);
          setHistory([]);
        }
      }

      /* ======================================================
         B) CRYPTO — YAHOO PRICE + YAHOO SPARKLINE
            (example: YAHOO:BTC-USD)
      ====================================================== */
      else if (symbol.startsWith("YAHOO:")) {
        const pair = symbol.replace("YAHOO:", "");

        // ----- Sparkline -----
        const histRes = await fetch(`/spark?symbol=${pair}`);
        const hist = await histRes.json();

        if (Array.isArray(hist)) {
          const closes = hist.filter((v) => v !== null);

          current = closes[closes.length - 1];
          previous = closes[closes.length - 2];

          setPrice(current);
          setChange(previous ? ((current - previous) / previous) * 100 : 0);
          setHistory(closes);
        } else {
          console.warn("Yahoo crypto invalid:", hist);
          setHistory([]);
        }
      }
    } catch (err) {
      console.error("MarketCard error:", err);
    }
  }

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

      {/* Sparkline */}
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

