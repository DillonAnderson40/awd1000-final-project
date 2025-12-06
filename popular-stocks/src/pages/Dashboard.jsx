import React from "react";
import MarketCard from "../components/MarketCard";
import GainersList from "../components/GainersList";
import LosersList from "../components/LosersList";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard — QuantShift</h1>

      <div className="dashboard-grid">
        {/* ================= LEFT SIDE — MARKET OVERVIEW ================= */}
        <div className="market-overview-section">
          <h2 className="section-title">Market Overview</h2>

          {/* ===== MAJOR STOCK INDEX ETFs ===== */}
          <MarketCard title="S&P 500" symbol="SPY" />
          <MarketCard title="NASDAQ 100" symbol="QQQ" />
          <MarketCard title="Dow Jones" symbol="DIA" />

          {/* ===== CRYPTO (Yahoo Format) ===== */}
          <MarketCard title="Bitcoin" symbol="BTC-USD" />
          <MarketCard title="Ethereum" symbol="ETH-USD" />
          <MarketCard title="Solana" symbol="SOL-USD" />
          <MarketCard title="Cardano" symbol="ADA-USD" />
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
    </div>
  );
}

