import React from "react";
import MarketCard from "../components/MarketCard";
import GainersList from "../components/GainersList";
import LosersList from "../components/LosersList";
import NewsFeed from "../components/NewsFeed";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard – QuantShift</h1>

      {/* GRID */}
      <div className="dashboard-grid">

        {/* LEFT COLUMN */}
        <div className="left-column">
          <h2>Market Overview</h2>
          <MarketCard name="S&P 500" symbol="SPY" />
          <MarketCard name="NASDAQ 100" symbol="QQQ" />
          <MarketCard name="Dow Jones" symbol="DIA" />
          <MarketCard name="Bitcoin" symbol="BINANCE:BTCUSDT" />
          <MarketCard name="Ethereum" symbol="BINANCE:ETHUSDT" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          <h2>Top Gainers</h2>
          <GainersList />

          <h2 style={{ marginTop: "30px" }}>Top Losers</h2>
          <LosersList />
        </div>

        {/* FULL-WIDTH NEWS */}
        <div className="news-section">
          <h2>News</h2>
          <NewsFeed />
        </div>

      </div>
    </div>
  );
}
