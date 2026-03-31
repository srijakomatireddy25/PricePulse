import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast from "react-hot-toast";

const ProductPage = () => {

  const [products,setProducts] = useState([]);

  const [form,setForm] = useState({
    name:"",
    category:"",
    description:""
  });

  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleEditChange = (e)=>{
    setEditingProduct({...editingProduct, [e.target.name]:e.target.value});
  };

  const fetchProducts = async()=>{
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch(err) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(()=>{
    fetchProducts();
  },[]);

  // Add Product
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await API.post("/products",form);
      setForm({
        name:"",
        category:"",
        description:""
      });
      fetchProducts();
      toast.success("Product added successfully!");
    } catch(err) {
      toast.error("Failed to add product");
    }
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  // Submit Edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${editingProduct.id}`, {
        name: editingProduct.name,
        category: editingProduct.category,
        description: editingProduct.description
      });
      fetchProducts();
      closeEditModal();
      toast.success("Product updated successfully!");
    } catch(err) {
      toast.error("Failed to update product");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
        toast.success("Product deleted successfully!");
      } catch(err) {
        toast.error("Failed to delete product");
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

  const sortedProducts = [...products].sort((a, b) => {
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
          <h1>📦 Manage Products</h1>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="form-row">
            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />
            <input
              name="description"
              placeholder="Description (Optional)"
              value={form.description}
              onChange={handleChange}
            />
            <button type="submit">Add Product</button>
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
                  <th onClick={() => requestSort('category')} style={{cursor: 'pointer'}}>
                    Category {sortConfig.key === 'category' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((p)=>(
                    <tr key={p.id}>
                      <td style={{color: "var(--text-muted)"}}>#{p.id}</td>
                      <td><strong>{p.name}</strong></td>
                      <td>
                        <span className="normal-badge">{p.category}</span>
                      </td>
                      <td style={{color: "var(--text-secondary)"}}>{p.description || "-"}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn action-btn-edit" 
                            title="Edit Product"
                            onClick={() => openEditModal(p)}
                          >
                            ✏️
                          </button>
                          <button 
                            className="action-btn action-btn-delete" 
                            title="Delete Product"
                            onClick={() => handleDelete(p.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="meta" style={{textAlign: "center", padding: "20px"}}>No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div>
                  <label style={{display:'block', marginBottom:'8px', fontSize:'14px', color:'var(--text-secondary)'}}>Product Name</label>
                  <input
                    name="name"
                    value={editingProduct.name}
                    onChange={handleEditChange}
                    required
                    style={{width: '100%', padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'}}
                  />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:'8px', fontSize:'14px', color:'var(--text-secondary)'}}>Category</label>
                  <input
                    name="category"
                    value={editingProduct.category}
                    onChange={handleEditChange}
                    required
                    style={{width: '100%', padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'}}
                  />
                </div>
                <div>
                  <label style={{display:'block', marginBottom:'8px', fontSize:'14px', color:'var(--text-secondary)'}}>Description</label>
                  <textarea
                    name="description"
                    value={editingProduct.description || ""}
                    onChange={handleEditChange}
                    style={{width: '100%', padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', minHeight: '80px', fontFamily: 'var(--font-sans)', resize: 'vertical'}}
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

export default ProductPage;