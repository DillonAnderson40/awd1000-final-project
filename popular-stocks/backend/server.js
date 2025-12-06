// server.js — FINISHED, CLEAN, FULL PROXY SERVER

import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // ensure you ran: npm install node-fetch@2

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

/* ============================================================
   1) BINANCE CRYPTO PROXY — FIXES GEO-BLOCK + CORS
   ============================================================ */
app.get("/binance", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const limit = req.query.limit || 30;

    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=${limit}`;
    const response = await fetch(url);

    const data = await response.json();

    // Binance sends an error object when geo-blocked
    if (!Array.isArray(data)) {
      return res.status(400).json({
        error: "Binance API error",
        details: data,
      });
    }

    res.json(data);
  } catch (err) {
    console.error("Binance Proxy Error:", err);
    res.status(500).json({ error: "Server error contacting Binance" });
  }
});

/* ============================================================
   2) YAHOO FINANCE SPARKLINE PROXY (FOR STOCKS)
   ============================================================ */
app.get("/spark", async (req, res) => {
  try {
    const symbol = req.query.symbol;

    if (!symbol) {
      return res.status(400).json({ error: "Symbol required" });
    }

    // Yahoo chart API — 7 days
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=7d&interval=1d`;

    const response = await fetch(url);
    const json = await response.json();

    const result = json.chart?.result?.[0];

    if (!result) {
      return res.status(400).json({
        error: "Invalid Yahoo Finance response",
        raw: json,
      });
    }

    const closes = result.indicators.quote[0].close;

    res.json(closes);
  } catch (err) {
    console.error("Yahoo Spark Proxy Error:", err);
    res.status(500).json({ error: "Server error contacting Yahoo Finance" });
  }
});

/* ============================================================
   START BACKEND SERVER
   ============================================================ */
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

