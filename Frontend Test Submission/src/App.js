
import React, { useState } from "react";
const logData = require("../../Logging Middleware/logger");

function App() {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState(30);
  const [statsCode, setStatsCode] = useState("");
  const [stats, setStats] = useState(null);

  const handleShorten = async () => {
    try {
      const response = await fetch("http://localhost:5000/shorturls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, shortcode, validity }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortLink(data.shortLink);
        logData("frontend", "info", "shorten-ui", "URL shortened successfully");
      } else {
        setShortLink("");
        alert(data.message || "Failed to shorten URL");
        logData("frontend", "warn", "shorten-ui", `Shorten failed: ${data.message}`);
      }
    } catch (error) {
      alert("Error occurred");
      logData("frontend", "error", "shorten-ui", `Shorten error: ${error.message}`);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`http://localhost:5000/shorturls/${statsCode}`);
      const data = await response.json();

      if (response.ok) {
        setStats(data);
        logData("frontend", "info", "stats-ui", "Fetched stats successfully");
      } else {
        setStats(null);
        alert(data.message || "Failed to fetch stats");
        logData("frontend", "warn", "stats-ui", `Stats fetch failed: ${data.message}`);
      }
    } catch (error) {
      alert("Error fetching stats");
      logData("frontend", "error", "stats-ui", `Stats fetch error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>URL Shortener</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "60%", marginRight: "1rem" }}
        />
        <input
          type="text"
          placeholder="Optional shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          style={{ width: "20%", marginRight: "1rem" }}
        />
        <input
          type="number"
          placeholder="Validity (mins)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          style={{ width: "10%", marginRight: "1rem" }}
        />
        <button onClick={handleShorten}>Shorten</button>
      </div>

      {shortLink && (
        <p>
          Short URL: <a href={shortLink} target="_blank" rel="noopener noreferrer">{shortLink}</a>
        </p>
      )}

      <hr />

      <h3>Check Statistics</h3>
      <input
        type="text"
        placeholder="Enter shortcode"
        value={statsCode}
        onChange={(e) => setStatsCode(e.target.value)}
        style={{ width: "40%", marginRight: "1rem" }}
      />
      <button onClick={fetchStats}>Get Stats</button>

      {stats && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Original URL:</strong> {stats.longUrl}</p>
          <p><strong>Total Clicks:</strong> {stats.totalClicks}</p>
          <p><strong>Created At:</strong> {new Date(stats.creationDate).toLocaleString()}</p>
          <p><strong>Expires At:</strong> {new Date(stats.expiryDate).toLocaleString()}</p>
          <h4>Click History:</h4>
          <ul>
            {stats.clickHistory.map((click, index) => (
              <li key={index}>
                {new Date(click.timestamp).toLocaleString()} — {click.referrer} — {click.geoLocation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
