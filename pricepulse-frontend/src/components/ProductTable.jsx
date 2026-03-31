const ProductTable = ({products}) => {
  return (
    <div style={{overflowX: "auto"}}>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p)=>(
              <tr key={p.id}>
                <td style={{color: "var(--text-muted)"}}>#{p.id}</td>
                <td><strong>{p.name}</strong></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="meta" style={{textAlign: "center", padding: "20px"}}>No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;