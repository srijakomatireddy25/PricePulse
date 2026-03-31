import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        
        <Link to="/dashboard" className="navbar-brand">
          <div className="logo-icon">PP</div>
          <span className="logo-text">PricePulse</span>
        </Link>

        <div className="nav-links">
          <Link to="/about" className={isActive("/about")}>
            <span className="nav-icon">ℹ️</span> About
          </Link>
          <Link to="/dashboard" className={isActive("/dashboard")}>
            <span className="nav-icon">📊</span> Dashboard
          </Link>
          <Link to="/products" className={isActive("/products")}>
            <span className="nav-icon">📦</span> Products
          </Link>
          <Link to="/sellers" className={isActive("/sellers")}>
            <span className="nav-icon">🏪</span> Sellers
          </Link>
          <Link to="/price" className={isActive("/price")}>
            <span className="nav-icon">💰</span> Add Price
          </Link>
          
        </div>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn" title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {isDarkMode ? "☀ Light" : "🌙 Dark"}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;