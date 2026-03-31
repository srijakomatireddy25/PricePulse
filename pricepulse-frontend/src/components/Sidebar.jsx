import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="sidebar">

      <h2 className="logo">PricePulse</h2>

      <nav>

        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/sellers">Sellers</Link>
        <Link to="/price-entry">Add Price</Link>

      </nav>

    </div>
  );
};

export default Sidebar;