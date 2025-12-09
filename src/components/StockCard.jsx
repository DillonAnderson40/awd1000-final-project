import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaTrash,
  FaEdit,
  FaBullseye,
  FaTag,
} from "react-icons/fa";

const API_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0";

export default function StockCard({ stock, deleteStock }) {
  const navigate = useNavigate();
  const { id, ticker, nickname, targetPrice } = stock;

  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [percent, setPercent] = useState(null);
  const [history, setHistory] = useState([]);

  async function fetchPrice() {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.c) return;

      const curr = data.c;
      const diff = curr - data.pc;
      const pct = (diff / data.pc) * 100;

      setPrice(curr);
      setChange(diff);
      setPercent(pct);

      setHistory((prev) => {
        if (prev.length === 0) {
          const seed = [];
          for (let i = 0; i < 20; i++) {
            const jitter = curr * (1 + (Math.random() - 0.5) * 0.01);
            seed.push(Number(jitter.toFixed(2)));
          }
          return seed;
        }

        const updated = [...prev, curr];
        if (updated.length > 20) updated.shift();
        return updated;
      });
    } catch (err) {
      console.log("Price fetch error:", err);
    }
  }

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, []);

  function generateSparkline(points) {
    if (points.length === 0) return "";
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    return points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * 100;
        const y = 100 - ((p - min) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");
  }

  const isUp = change > 0;
  const isDown = change < 0;

  const trendColor = isUp ? "#00ff99" : isDown ? "#ff4d4d" : "#999";

  // ⭐ NEW — Navigate to Add Stock page with stock data
  function handleEdit() {
    navigate("/add", {
      state: { stock }, // pass entire stock object to edit page
    });
  }

  return (
    <div
      className="p-3 rounded shadow-sm"
      style={{
        background: "#1b1d22",
        border: `2px solid ${trendColor}`,
        minHeight: "320px",
      }}
    >
      <h4 className="d-flex align-items-center gap-2 text-light mb-1">
        <FaChartLine color={trendColor} />
        {ticker}
        <span style={{ color: trendColor }}>
          {isUp ? "↑" : isDown ? "↓" : "→"}
        </span>
      </h4>

      <div className="text-secondary mb-2">{nickname}</div>

      <svg width="100%" height="60" viewBox="0 0 100 100">
        <polyline
          fill="none"
          stroke={trendColor}
          strokeWidth="2"
          points={generateSparkline(history)}
        />
      </svg>

      <p className="text-light mb-1">
        <FaBullseye /> <strong>Target:</strong> ${targetPrice}
      </p>

      <p className="text-light mb-1">
        <FaTag />{" "}
        <strong>Now:</strong>{" "}
        {price ? (
          <>
            ${price.toFixed(2)}{" "}
            <span style={{ color: trendColor }}>
              ({percent?.toFixed(2)}%)
            </span>
          </>
        ) : (
          "Loading..."
        )}
      </p>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-warning btn-sm" onClick={handleEdit}>
          <FaEdit /> Edit
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteStock(id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}
