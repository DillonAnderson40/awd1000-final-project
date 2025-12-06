import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

/* -----------------------------------------
   BINANCE REMOVED — GEO BLOCKED IN U.S.
----------------------------------------- */

app.get("/spark", async (req, res) => {
  try {
    const symbol = req.query.symbol;

    if (!symbol) {
      return res.status(400).json({ error: "Symbol required" });
    }

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=7d&interval=1d`;
    const response = await fetch(url);
    const json = await response.json();

    const result = json.chart?.result?.[0];
    if (!result) {
      return res.status(400).json({ error: "Invalid Yahoo Finance response", raw: json });
    }

    const closes = result.indicators.quote[0].close;
    res.json(closes);
  } catch (err) {
    console.error("Yahoo Spark Proxy Error:", err);
    res.status(500).json({ error: "Server error contacting Yahoo Finance" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});


