import React from "react";
import MarketCard from "../components/MarketCard";
import GainersList from "../components/GainersList";
import LosersList from "../components/LosersList";
import NewsFeed from "../components/NewsFeed";

import "./Dashboard.css"; // <-- REQUIRED

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">

      {/* PAGE TITLE */}
      <h1 className="dashboard-title">Dashboard — QuantShift</h1>

      {/* TWO-COLUMN GRID */}
      <div className="dashboard-grid">

        {/* LEFT COLUMN — MARKET OVERVIEW */}
        <div className="left-column">
          <h2>Market Overview</h2>

          <MarketCard title="S&P 500" symbol="SPY" />
          <MarketCard title="NASDAQ 100" symbol="QQQ" />
          <MarketCard title="Dow Jones" symbol="DIA" />
          <MarketCard title="Bitcoin" symbol="BINANCE:BTCUSDT" />
          <MarketCard title="Ethereum" symbol="BINANCE:ETHUSDT" />
        </div>

        {/* RIGHT COLUMN — GAINERS & LOSERS */}
        <div className="right-column">
          <h2>Top Gainers</h2>
          <GainersList />

          <h2 style={{ marginTop: "40px" }}>Top Losers</h2>
          <LosersList />
        </div>

        {/* FULL-WIDTH NEWS SECTION */}
        <div className="news-section">
          <NewsFeed />
        </div>

      </div>
    </div>
  );
}

