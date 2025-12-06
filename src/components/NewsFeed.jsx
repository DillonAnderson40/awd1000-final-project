import React, { useEffect, useState } from "react";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const res = await fetch("http://localhost:5000/news");
      const data = await res.json();

      if (Array.isArray(data)) {
        setArticles(data);
      }

      setLoading(false);
    } catch (err) {
      console.error("NewsFeed error:", err);
      setLoading(false);
    }
  }

  if (loading) {
    return <p style={{ opacity: 0.6 }}>Loading news...</p>;
  }

  return (
    <div className="news-feed">
      {articles.map((article, idx) => (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card-link"
          key={idx}
        >
          <div className="news-article">
            <div className="news-article-title">{article.title}</div>

            <div className="news-meta">
              <span className="news-source">{article.source || "Reddit"}</span>
              <span className="news-date">
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : ""}
              </span>
            </div>

            {article.description && (
              <p className="news-description">{article.description}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}