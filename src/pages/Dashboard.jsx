import React from "react";
import MarketCard from "../components/MarketCard";
import GainersList from "../components/GainersList";
import LosersList from "../components/LosersList";
import NewsFeed from "../components/NewsFeed";
import "../pages/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard — QuantShift</h1>

      <div className="dashboard-grid">
        
        {/* ================= LEFT SIDE — MARKET OVERVIEW ================= */}
        <div className="market-overview-section">
          <h2 className="section-title">Market Overview</h2>

          <div className="market-card-grid">
            {/* ===== MAJOR STOCK INDEX ETFs ===== */}
            <MarketCard title="S&P 500" symbol="SPY" />
            <MarketCard title="NASDAQ 100" symbol="QQQ" />
            <MarketCard title="Dow Jones" symbol="DIA" />

            {/* ===== CRYPTO (Yahoo Format) ===== */}
            <MarketCard title="Bitcoin" symbol="YAHOO:BTC-USD" />
            <MarketCard title="Ethereum" symbol="YAHOO:ETH-USD" />
            <MarketCard title="Solana" symbol="YAHOO:SOL-USD" />
          </div>
        </div>

        {/* ================= RIGHT SIDE — GAINERS & LOSERS ================= */}
        <div className="gainers-losers-section">
          <div className="gainers-section">
            <h2 className="section-title">Top Gainers</h2>
            <GainersList />
          </div>

          <div className="losers-section">
            <h2 className="section-title">Top Losers</h2>
            <LosersList />
          </div>
        </div>

      </div>

      {/* ================= NEWS SECTION ================= */}
      <div className="news-section">
        <h2 className="section-title">/WallStreetBets - Hot Posts</h2>
        <NewsFeed />
      </div>

    </div>
  );
}


