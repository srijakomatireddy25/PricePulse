import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast from "react-hot-toast";

const SellerPage = () => {

  const [sellers,setSellers] = useState([]);

  const [form,setForm] = useState({
    name:"",
    website:"",
    email:""
  });

  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleEditChange = (e)=>{
    setEditingSeller({...editingSeller, [e.target.name]:e.target.value});
  };

  const fetchSellers = async()=>{
    try {
      const res = await API.get("/sellers");
      setSellers(res.data);
    } catch(err) {
      toast.error("Failed to fetch sellers");
    }
  };

  useEffect(()=>{
    fetchSellers();
  },[]);

  // Add Seller
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await API.post("/sellers",form);
      setForm({
        name:"",
        website:"",
        email:""
      });
      fetchSellers();
      toast.success("Seller added successfully!");
    } catch(err) {
      toast.error("Failed to add seller");
    }
  };

  // Open Edit Modal
  const openEditModal = (seller) => {
    setEditingSeller(seller);
    setIsEditModalOpen(true);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSeller(null);
  };

  // Submit Edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/sellers/${editingSeller.id}`, {
        name: editingSeller.name,
        website: editingSeller.website,
        email: editingSeller.email
      });
      fetchSellers();
      closeEditModal();
      toast.success("Seller updated successfully!");
    } catch(err) {
      toast.error("Failed to update seller");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this seller?")) {
      try {
        await API.delete(`/sellers/${id}`);
        fetchSellers();
        toast.success("Seller deleted successfully!");
      } catch(err) {
        toast.error("Failed to delete seller");
      }
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedSellers = [...sellers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return(
    <div>
      <Navbar/>
      
      <div className="page-container">
        
        <div className="page-header">
          <h1>🏪 Manage Sellers</h1>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="form-row">
            <input
              name="name"
              placeholder="Seller Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="website"
              type="url"
              placeholder="https://example.com"
              value={form.website}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="contact@seller.com"
              value={form.email}
              onChange={handleChange}
            />
            <button type="submit">Add Seller</button>
          </form>
        </div>

        <div className="card animate-fade-in" style={{marginTop: "30px"}}>
          <div style={{overflowX: "auto"}}>
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('id')} style={{cursor: 'pointer'}}>
                    ID {sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => requestSort('name')} style={{cursor: 'pointer'}}>
                    Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th>Website</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedSellers.length > 0 ? (
                  sortedSellers.map((s)=>(
                    <tr key={s.id}>
                      <td style={{color: "var(--text-muted)"}}>#{s.id}</td>
                      <td><strong>{s.name}</strong></td>
                      <td>
                        {s.website ? (
                          <a href={s.website} target="_blank" rel="noreferrer" style={{color: "var(--info)"}}>
                            {s.website}
                          </a>
                        ) : (
                          <span style={{color: "var(--text-secondary)"}}>-</span>
                        )}
                      </td>
                      <td style={{color: "var(--text-secondary)"}}>{s.email || "-"}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn action-btn-edit" 
                            title="Edit Seller"
                            onClick={() => openEditModal(s)}
                          >
                            ✏️
                          </button>
                          <button 
                            className="action-btn action-btn-delete" 
                            title="Delete Seller"
                            onClick={() => handleDelete(s.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="meta" style={{textAlign: "center", padding: "20px"}}>No sellers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingSeller && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Seller</h3>
            <form onSubmit={handleEditSubmit}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div>
                  <label style={{display:'block', marginBottom:'8px', fontSize:'14px', color:'var(--text-secondary)'}}>Seller Name</label>
                  <input
                    name="name"
                    value={editingSeller.name}
                    onChange={handleEditChange}
                    required
                    style={{width: '100%', padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'}}
                  />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:'8px', fontSize:'14px', color:'var(--text-secondary)'}}>Website</label>
                  <input
                    name="website"
                    type="url"
                    value={editingSeller.website || ""}
                    onChange={handleEditChange}
                    style={{width: '100%', padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'}}
                  />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:'8px', fontSize:'14px', color:'var(--text-secondary)'}}>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={editingSeller.email || ""}
                    onChange={handleEditChange}
                    style={{width: '100%', padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'}}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={closeEditModal}>Cancel</button>
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default SellerPage;