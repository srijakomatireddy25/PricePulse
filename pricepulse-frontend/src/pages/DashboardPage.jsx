// // import { useEffect, useState } from "react";
// // import API from "../services/api";
// // import Navbar from "../components/Navbar";
// // import PriceChart from "../components/PriceChart";

// // const DashboardPage = () => {

// //   const [products,setProducts] = useState([]);
// //   const [productId,setProductId] = useState("");

// //   const [lowest,setLowest] = useState(null);
// //   const [compare,setCompare] = useState([]);
// //   const [drops,setDrops] = useState([]);
// //   const [history,setHistory] = useState([]);

// //   useEffect(()=>{
// //     loadProducts();
// //   },[]);

// //   const loadProducts = async()=>{
// //     const res = await API.get("/products");
// //     setProducts(res.data);
// //   };

// //   const loadAnalytics = async(id)=>{

// //     if(!id) return;

// //     try{

// //       const l = await API.get(`/prices/lowest/${id}`);
// //       const c = await API.get(`/prices/compare/${id}`);
// //       const d = await API.get(`/prices/drop/${id}`);
// //       const h = await API.get(`/prices/history/${id}`);

// //       setLowest(l.data);
// //       setCompare(c.data);
// //       setDrops(d.data);
// //       setHistory(h.data);

// //     }catch(err){
// //       console.log(err);
// //     }
// //   };

// //   const handleProduct = (e)=>{
// //     const id = e.target.value;
// //     setProductId(id);
// //     loadAnalytics(id);
// //   };

// //   return(

// //     <div>

// //       <Navbar/>

// //       <div className="page-container">

// //         <h2>PricePulse Dashboard</h2>

// //         <select value={productId} onChange={handleProduct}>

// //           <option value="">Select Product</option>

// //           {products.map(p=>(
// //             <option key={p.id} value={p.id}>
// //               {p.name}
// //             </option>
// //           ))}

// //         </select>

// //         {/* Lowest Price */}

// //         <div className="card">

// // <h3>Lowest Price</h3>

// // {lowest ? (
// //   <>
// //     <p>Seller: <b>{lowest.sellerName}</b></p>
// //     <p>Price: <b>₹{lowest.price}</b></p>
// //   </>
// // ) : (
// //   <p>No price data available</p>
// // )}

// // </div>


// //         {/* Seller Comparison */}

// //         <div className="card">

// //           <h3>Seller Price Comparison</h3>

// //           <table>

// //             <thead>
// //               <tr>
// //                 <th>Seller</th>
// //                 <th>Latest Price</th>
// //               </tr>
// //             </thead>

// //             <tbody>

// //               {compare.length > 0 ? (

// //                 compare.map((c,i)=>(
// //                   <tr key={i}>
// //                     <td>{c.seller}</td>
// //                     <td>₹{c.price}</td>
// //                   </tr>
// //                 ))

// //               ) : (

// //                 <tr>
// //                   <td colSpan="2">No data</td>
// //                 </tr>

// //               )}

// //             </tbody>

// //           </table>

// //         </div>


// //         {/* Price Drops */}

// //         <div className="card">

// //           <h3>Price Drops</h3>

// //           <table>

// //             <thead>
// //               <tr>
// //                 <th>Seller</th>
// //                 <th>Old Price</th>
// //                 <th>New Price</th>
// //               </tr>
// //             </thead>

// //             <tbody>

// // {drops.map((item,index)=>(
// //   <tr key={index}>
// //     <td>{item.seller}</td>
// //     <td>₹{item.oldPrice}</td>
// //     <td>₹{item.newPrice}</td>
// //   </tr>
// // ))}

// // </tbody>

// //           </table>

// //         </div>
// //         <div className="card">

// // <h3>Price Trend</h3>

// // <PriceChart data={history}/>

// // </div>
// //       </div>

// //     </div>
// //   );
// // };

// // export default DashboardPage;
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import PriceTrendTab from "../components/PriceTrendTab";
import "../styles/dashboard.css";

const DashboardPage = () => {

  const [products,setProducts] = useState([]);
  const [productId,setProductId] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const [lowest,setLowest] = useState(null);
  const [compare,setCompare] = useState([]);
  const [drops,setDrops] = useState([]);
  const [stats,setStats] = useState(null);

  useEffect(()=>{
    loadProducts();
  },[]);

  const loadProducts = async()=>{
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadAnalytics = async(id)=>{

    if(!id) return;

    try{

      const l = await API.get(`/prices/lowest/${id}`);
      const c = await API.get(`/prices/compare/${id}`);
      const d = await API.get(`/prices/drop/${id}`);
      const s = await API.get(`/prices/stats/${id}`);

      setLowest(l.data);
      setCompare(c.data);
      setDrops(d.data);
      setStats(s.data);

    }catch(err){
      console.log(err);
    }
  };

  const handleProduct = (e)=>{
    const id = e.target.value;
    setProductId(id);
    loadAnalytics(id);
  };
  // 🔹 Find highest price + seller
const highestPrice = compare.length
  ? Math.max(...compare.map(p => p.price))
  : null;

const highestSeller = compare.find(p => p.price === highestPrice);

// 🔹 Find lowest price + best seller
const lowestPrice = compare.length
  ? Math.min(...compare.map(p => p.price))
  : null;

const bestSeller = compare.find(p => p.price === lowestPrice);
  return(

    <div>

      <Navbar/>

      <div className="dashboard">

        <h1>📊 PricePulse Analytics</h1>

        <select className="product-select" value={productId} onChange={handleProduct}>
          <option value="">Select Product</option>
          {products.map(p=>(
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Tabs Navigation */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trend' ? 'active' : ''}`}
            onClick={() => setActiveTab('trend')}
          >
            Price Trend Chart
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' ? (
          <div className="tab-pane">
            {/* Price Statistics Analytics Section */}
            {stats && (
              <div className="stats">
                <div className="analytics-card">
                  <div className="analytics-icon-wrapper">
                    📊
                  </div>
                  <div className="analytics-content">
                    <h4>Average Price</h4>
                    <p className="price">
                      ₹{stats.averagePrice || 0}
                    </p>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="analytics-icon-wrapper">
                    📈
                  </div>
                  <div className="analytics-content">
                    <h4>Highest Price</h4>
                    <p className="price">
                    ₹{stats.highestPrice || 0}
                    </p>
                    <span className="seller-sub">
                      Seller: {highestSeller?.seller || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="analytics-icon-wrapper">
                    📉
                  </div>
                  <div className="analytics-content">
                    <h4>Lowest Price</h4>
                    <p className="price">
                    ₹{stats.lowestPrice || 0}
                  </p>
                  <span className="seller-sub">
                    Best Seller: {bestSeller?.seller || "N/A"} 🏆
                  </span>
                  </div>
                </div>

                <div className="analytics-card">
                  <div className="analytics-icon-wrapper">
                    💰
                  </div>
                  <div className="analytics-content">
                    <h4>Price Change</h4>
                    <p className="price">
                      {stats.priceChangePercentage || 0}%
                    </p>
                    <span className={`percentage ${stats.priceChangePercentage > 0 ? 'positive' : 'negative'}`}>
                      {stats.priceChangePercentage > 0 ? '↑ Increased' : stats.priceChangePercentage < 0 ? '↓ Decreased' : 'Stable'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Seller Comparison */}
            <div className="card">
              <h3>🏪 Seller Price Comparison</h3>
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Seller</th>
                    <th>Latest Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.length > 0 ? (
                    compare.map((c, i) => {
                      const lowestPrice = Math.min(...compare.map(p => p.price));
                      return (
                        <tr key={i}>
                          <td className="seller-name">{c.seller || "Unknown Seller"}</td>
                          <td className="seller-price">₹{c.price}</td>
                          <td>
                            {c.price === lowestPrice ? (
                              <span className="best-badge">🏆 Best Price</span>
                            ) : (
                              <span className="normal-badge">Available</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-data">No seller prices available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Price Drops */}
            <div className="card">
              <h3>⚡ Price Drops</h3>
              <table>
                <thead>
                  <tr>
                    <th>Seller</th>
                    <th>Old Price</th>
                    <th>New Price</th>
                  </tr>
                </thead>
                <tbody>
                  {drops.map((d, i) => (
                    <tr key={i}>
                      <td>{d.seller}</td>
                      <td>₹{d.oldPrice}</td>
                      <td>
                        <span className="drop-badge">↓ ₹{d.newPrice}</span>
                      </td>
                    </tr>
                  ))}
                  {drops.length === 0 && (
                    <tr>
                      <td colSpan="3" className="no-data" style={{textAlign: "center", padding: "16px"}}>No recent price drops</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <PriceTrendTab productId={productId} />
        )}

      </div>

    </div>

  );
};

export default DashboardPage;