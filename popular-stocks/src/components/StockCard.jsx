import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

export default function StockCard({ stock, deleteStock }) {
  const navigate = useNavigate();

  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [percent, setPercent] = useState(null);
  const [history, setHistory] = useState([]);

  const symbol = stock.ticker.toUpperCase();
  const API_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0";


  // -------------------------
  // Fetch Latest Stock Price
  // -------------------------
  async function loadPrice() {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data?.c) return;

      const curr = Number(data.c.toFixed(2));
      const prev = Number(data.pc?.toFixed(2)) || curr;

      setPrice(curr);
      setChange(Number((curr - prev).toFixed(2)));
      setPercent(Number(((curr - prev) / prev * 100).toFixed(2)));

      // -------- Sparkline History Logic ---------
      setHistory((prevPoints) => {
        // First load → generate 20 fake historical points
        if (prevPoints.length === 0) {
          const seeded = [];
          for (let i = 1; i <= 20; i++) {
            const jitter = curr * (1 + (Math.random() - 0.5) * 0.01); // ±1% variation
            seeded.push(Number(jitter.toFixed(2)));
          }
          return seeded;
        }

        // Normal behavior → append new point
        const updated = [...prevPoints, curr];
        if (updated.length > 20) updated.shift();

        return updated;
      });

    } catch (err) {
      console.error("Error loading price:", err);
    }
  }

  // Run once + auto-refresh every 15 seconds
  useEffect(() => {
    loadPrice();
    const interval = setInterval(loadPrice, 15000);
    return () => clearInterval(interval);
  }, []);

  // -------------------------
  // Trend Arrow Display
  // -------------------------
  const trendArrow =
    percent > 0 ? "↑" : percent < 0 ? "↓" : "→";

  const trendColor =
    percent > 0 ? "#00ff88" :
    percent < 0 ? "#ff4d4d" :
    "#cccccc";

  // -------------------------
  // Sparkline Chart Settings
  // -------------------------
  const chartData = {
    labels: history.map((_, i) => i),
    datasets: [
      {
        data: history,
        borderColor: trendColor,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35, // smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="card bg-dark text-light p-3 shadow"
         style={{ border: `2px solid ${trendColor}`, borderRadius: "12px" }}>

      {/* ----- Ticker / Trend Arrow Header ----- */}
      <h4 className="d-flex align-items-center gap-2">
        <span>📈 {symbol}</span>
        <span style={{ color: trendColor, fontSize: "1.4rem" }}>{trendArrow}</span>
      </h4>

      <p className="text-muted">{stock.nickname || "—"}</p>

      {/* ----- Target Price ----- */}
      <p>
        <strong>🎯 Target:</strong> ${stock.targetPrice}
      </p>

      {/* ----- Live Price ----- */}
      <p>
        <strong>🏷️ Now:</strong>{" "}
        {price ? (
          <span style={{ color: trendColor }}>
            ${price}
          </span>
        ) : (
          "Loading..."
        )}
      </p>

      {/* ----- Change % and $ ----- */}
      {percent !== null && (
        <p style={{ color: trendColor }}>
          {percent}% ({change > 0 ? "+" : ""}{change})
        </p>
      )}

      {/* ----- Sparkline Chart ----- */}
      <div style={{ height: "40px", margin: "10px 0" }}>
        <Line data={chartData} options={chartOptions} />
      </div>

      <p className="text-muted small">
        📅 Added: {new Date(stock.dateAdded).toLocaleDateString()}
      </p>

      {/* ----- Buttons ----- */}
      <div className="d-flex gap-2 mt-2">
        <button
          className="btn btn-warning btn-sm"
          onClick={() => navigate(`/edit/${stock.id}`)}
        >
          ✏️ Edit
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteStock(stock.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
