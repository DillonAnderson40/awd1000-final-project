import { useEffect, useState } from "react";
import MarketCard from "../components/MarketCard";
import GainersList from "../components/GainersList";
import LosersList from "../components/LosersList";
import NewsFeed from "../components/NewsFeed";
import WatchlistPreview from "../components/WatchlistPreview";

export default function Dashboard() {
  return (
    <div className="container text-light py-4">
      <h2 className="mb-4">Dashboard - QuantShift</h2>

      {/* Market Overview */}
      <h4 className="mt-3">Market Overview</h4>
      <div className="row g-3 mb-4">
        <MarketCard title="S&P 500" ticker="^GSPC" />
        <MarketCard title="NASDAQ 100" ticker="^NDX" />
        <MarketCard title="Dow Jones" ticker="^DJI" />
        <MarketCard title="Bitcoin" ticker="BTC-USD" />
        <MarketCard title="Ethereum" ticker="ETH-USD" />

      </div>

      {/* Movers */}
      <div className="row g-3">
        <div className="col-md-6">
          <GainersList />
        </div>
        <div className="col-md-6">
          <LosersList />
        </div>
      </div>

      {/* Watchlist Preview */}
      <h4 className="mt-5">Your Watchlist Overview</h4>
      <WatchlistPreview />

      {/* News */}
      <h4 className="mt-5">Market News</h4>
      <NewsFeed />
    </div>
  );
}
