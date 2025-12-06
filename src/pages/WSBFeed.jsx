import React from "react";
import NewsFeed from "../components/NewsFeed";

export default function WSBFeed() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">/WallStreetBets — Hot Posts</h1>

      <div className="news-section">
        <NewsFeed />
      </div>
    </div>
  );
}
