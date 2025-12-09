import React, { useEffect, useState } from "react";

const API = "https://quantshift-backend.onrender.com";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const res = await fetch(`${API}/news`);
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    } catch (err) {
      console.error("NewsFeed error:", err);
      setLoading(false);
    }
  }

  if (loading) return <p>Loading WSB posts…</p>;

  return (
    <div className="news-feed">
      {articles.map((a, i) => (
        <a
          key={i}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card-link"
        >
          <div className="news-article">
            <div className="news-article-title">{a.title}</div>

            <div className="news-meta">
              <span>{a.source}</span>
              <span>{new Date(a.publishedAt).toLocaleString()}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
