import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      <Navbar />

      <div className="page-container" style={{ maxWidth: '1200px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', padding: '60px 20px', marginBottom: '40px' }} className="animate-fade-in">
          <h1 style={{ fontSize: '48px', marginBottom: '16px', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            PricePulse
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            The ultimate product price tracking and analytics platform. Stay ahead of market trends, monitor competitors, and discover the best pricing strategies.
          </p>
          <div style={{ marginTop: '30px' }}>
            <Link to="/dashboard" style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'var(--accent-gradient)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
              textDecoration: 'none'
            }}>
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="feature-grid animate-fade-in" style={{ animationDelay: '0.2s' }}>
          
          <div className="feature-card">
            <span className="feature-icon">📦</span>
            <h3>Product Tracking</h3>
            <p>
              Easily manage and monitor your extensive catalog of products in real-time. Keep product details, categories, and descriptions organized in one central hub.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🏪</span>
            <h3>Seller Comparison</h3>
            <p>
              Analyze multiple sellers across the market. Automatically identify who is offering the lowest price and stay competitive without manual research.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Price Drop Detection</h3>
            <p>
              Instantly track sudden price changes. Our system detects price drops and highlights them so you can react to market shifts immediately.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h3>Trend Analytics</h3>
            <p>
              Visualize historical pricing data with interactive charts. Understand how prices fluctuate over time to make data-driven purchasing or pricing decisions.
            </p>
          </div>

        </div>

        {/* Footer */}
        <footer style={{
          marginTop: '80px',
          paddingTop: '30px',
          borderTop: '1px solid var(--border-light)',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }} className="animate-fade-in">
          <p>© 2025 PricePulse Analytics. Built with React & Recharts.</p>
        </footer>

      </div>
    </div>
  );
};

export default AboutPage;
