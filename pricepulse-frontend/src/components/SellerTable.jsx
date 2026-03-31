const SellerTable = ({sellers}) => {
  // Assuming 'sellers' is passed, the original code incorrectly mapped over 'compare'
  return (
    <div style={{overflowX: "auto"}}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Seller Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sellers && sellers.length > 0 ? (
            sellers.map((item,index)=>(
              <tr key={index}>
                <td><strong>{item.sellerName}</strong></td>
                <td style={{color: "var(--success)"}}>₹{item.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="meta" style={{textAlign: "center", padding: "20px"}}>No sellers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerTable;