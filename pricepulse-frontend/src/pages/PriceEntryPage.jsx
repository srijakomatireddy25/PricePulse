import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast from "react-hot-toast";

const PriceEntryPage = () => {

  const [products,setProducts] = useState([]);
  const [sellers,setSellers] = useState([]);
  const [prices, setPrices] = useState([]);
  const [form,setForm] = useState({
    productId:"",
    sellerId:"",
    price:""
  });

  // Inline Edit State
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editFormData, setEditFormData] = useState({ price: "" });

  const fetchData = async()=>{
    try {
      const p = await API.get("/products");
      const s = await API.get("/sellers");
      setProducts(p.data);
      setSellers(s.data);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "productId") {
      fetchPrices(value);
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        `/prices?productId=${form.productId}&sellerId=${form.sellerId}&price=${form.price}`
      );
      setForm({
        productId: form.productId, // Keep product selected
        sellerId: "",
        price: ""
      });
      fetchPrices(form.productId);
      toast.success("Price added successfully!");
    } catch(err) {
      toast.error("Failed to add price");
    }
  };

  const fetchPrices = async (productId) => {
    if (!productId) {
      setPrices([]);
      return;
    }
    try {
      const res = await API.get(`/prices/product/${productId}`);
      setPrices(res.data);
    } catch(err) {
      console.log(err);
    }
  };

  // Inline Edit Handlers
  const handleEditClick = (priceObj) => {
    setEditingPriceId(priceObj.id);
    setEditFormData({
      price: priceObj.price
    });
  };

  const handleCancelEdit = () => {
    setEditingPriceId(null);
    setEditFormData({ price: "" });
  };

  const handleSaveEdit = async (id) => {
    if(!editFormData.price) return;
    
    try {
      // The instructions indicated putting JSON payload: { "price": 74000 }
      // Assuming the backend accepts JSON body for this PUT endpoint.
      await API.put(`/prices/${id}`, {
        price: Number(editFormData.price)
      });
      
      setEditingPriceId(null);
      fetchPrices(form.productId);
      toast.success("Price updated successfully");
    } catch(err) {
      toast.error("Failed to update price");
    }
  };
  const handleDeletePrice = async (id) => {
  if(window.confirm("Are you sure you want to delete this price?")) {
    try {
      await API.delete(`/prices/${id}`);
      fetchPrices(form.productId);
      toast.success("Price deleted successfully!");
    } catch(err) {
      toast.error("Failed to delete price");
    }
  }
};
  return(
    <div>
      <Navbar/>
      
      <div className="page-container">
        
        <div className="page-header">
          <h1>💰 Add Price Record</h1>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="form-row">
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {products.map((p)=>(
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select
              name="sellerId"
              value={form.sellerId}
              onChange={handleChange}
              required
            >
              <option value="">Select Seller</option>
              {sellers.map((s)=>(
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <input
              name="price"
              type="number"
              placeholder="Price Amount (₹)"
              value={form.price}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit Price</button>
          </form>
        </div>

        {form.productId && (
          <div className="card animate-fade-in" style={{marginTop: "30px"}}>
            <h3>Price History</h3>
            
            {prices.length > 0 ? (
              <div style={{overflowX: "auto"}}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Seller</th>
                      <th>Recorded Price</th>
                      <th>Date Added</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((p) => {
                      const isEditing = editingPriceId === p.id;

                      return (
                        <tr key={p.id}>
                          <td><strong>{p.seller.name}</strong></td>
                          
                          <td>
                            {isEditing ? (
                              <input
                                type="number"
                                name="price"
                                className="inline-edit-input"
                                value={editFormData.price}
                                onChange={handleEditChange}
                                required
                              />
                            ) : (
                              <span style={{color: "var(--success)"}}>₹ {p.price}</span>
                            )}
                          </td>
                          
                          <td>
                            {new Date(p.recordedAt).toLocaleString([], {
                              dateStyle: 'medium',
                              timeStyle: 'short'
                            })}
                          </td>
                          
                          <td>
                            <div className="action-buttons">
                              {isEditing ? (
  <>
    <button
      onClick={() => handleSaveEdit(p.id)}
      className="action-btn action-btn-save"
      title="Save"
    >
      ✔️ Save
    </button>
    <button
      onClick={handleCancelEdit}
      className="action-btn action-btn-cancel"
      title="Cancel"
    >
      ✖️ Cancel
    </button>
  </>
) : (
  <>
    <button
      onClick={() => handleEditClick(p)}
      className="action-btn action-btn-edit"
      title="Edit Price"
    >
      ✏️
    </button>

    {/* 🔥 NEW DELETE BUTTON */}
    <button
      onClick={() => handleDeletePrice(p.id)}
      className="action-btn action-btn-delete"
      title="Delete Price"
    >
      🗑️
    </button>
  </>
)}
                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="meta" style={{padding: "20px 0"}}>No pricing history found for this product yet.</p>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default PriceEntryPage;