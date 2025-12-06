import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 5000;

// 🔥 SAFER Binance Proxy Route
app.get("/binance", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const limit = req.query.limit || 30;

    if (!symbol) {
      return res.status(400).json({ error: "Missing symbol parameter" });
    }

    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=${limit}`;

    const response = await fetch(url);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("❌ Binance returned NON-JSON (HTML or error page):", text);
      return res.status(500).json({ error: "Binance returned invalid data" });
    }

    // Binance error cases show up as objects, not arrays
    if (!Array.isArray(data)) {
      console.error("❌ Binance error response:", data);
      return res.status(500).json({ error: "Binance API error", details: data });
    }

    res.json(data);

  } catch (err) {
    console.error("🔥 Proxy ERROR:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

