import React, { useEffect, useState } from "react";
import API from "../services/api";
import PriceChart from "./PriceChart";

const PriceTrendTab = ({ productId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      if (!productId) {
        setHistory([]);
        return;
      }
      setLoading(true);
      try {
        const h = await API.get(`/prices/history/${productId}`);
        setHistory(h.data);
      } catch (err) {
        console.error("Failed to load price history:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [productId]);

  return (
    <div className="tab-pane fade-in">
      <div className="card trend-card">
        <h3>📈 Price Trend History</h3>
        {loading ? (
          <div className="loading-state">Loading chart data...</div>
        ) : !productId ? (
          <div className="empty-state">Please select a product to view its price trend.</div>
        ) : (
          <PriceChart data={history} />
        )}
      </div>
    </div>
  );
};

export default PriceTrendTab;
