// server.js — Yahoo Finance Proxy for Stocks + Crypto
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm install node-fetch@2

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

/* ============================================================
   1) SPARKLINE + PRICE FOR STOCKS & CRYPTO (Yahoo Finance)
   ============================================================ */
app.get("/chart", async (req, res) => {
  try {
    const symbol = req.query.symbol;  // Ex: AAPL or BTC-USD

    if (!symbol) {
      return res.status(400).json({ error: "Symbol required" });
    }

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=7d&interval=1d`;

    const response = await fetch(url);
    const json = await response.json();

    const result = json.chart?.result?.[0];
    if (!result) {
      return res.status(400).json({
        error: "Yahoo returned invalid data",
        raw: json,
      });
    }

    const closes = result.indicators.quote[0].close;
    const current = closes[closes.length - 1];
    const previous = closes[closes.length - 2];

    res.json({
      current,
      previous,
      history: closes.filter((v) => v !== null)
    });

  } catch (error) {
    console.error("Chart API error:", error);
    res.status(500).json({ error: "Server error fetching data" });
  }
});

/* ============================================================
   START SERVER
   ============================================================ */
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});


