import { useEffect, useState } from "react";
import api from "../api/Api.js";
import AdminAddProduct from "./AdminAddProduct.jsx";
import "../../App.css";
const IMAGE_BASE_URL = "http://localhost:5000/uploads";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/delete/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const refreshProducts = () => {
    setEditingProduct(null);
    fetchProducts();
  };

return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <AdminAddProduct product={editingProduct} onSuccess={refreshProducts} />

      <h2 className="admin-title" style={{ fontSize: '1.5rem', marginTop: 50 }}>
        Inventory Overview
      </h2>

      <div className="admin-table-container">
        {products.length === 0 ? (
          <p style={{ padding: 20 }}>No products found in inventory.</p>
        ) : (
          <table className="admin-table">
            <thead className="admin-thead">
              <tr>
                <th className="admin-th">Product</th>
                <th className="admin-th">Category</th>
                <th className="admin-th">Price</th>
                <th className="admin-th">Stock</th>
                <th className="admin-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="admin-td">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      {p.image ? (
                        <img
                          src={`${IMAGE_BASE_URL}/${p.image}`}
                          alt={p.title}
                          className="admin-product-img"
                          onError={(e) => (e.target.src = "https://via.placeholder.com/80?text=No+Image")}
                        />
                      ) : <div className="admin-product-img" style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px'}}>N/A</div>}
                      <span style={{ fontWeight: '600', color: '#2d3436' }}>{p.title}</span>
                    </div>
                  </td>
                  <td className="admin-td">
                    <span className="admin-category-badge">{p.category}</span>
                  </td>
                  <td className="admin-td" style={{ fontWeight: 'bold' }}>${p.price}</td>
                  <td className="admin-td">
                    <span style={{ color: p.stock < 10 ? '#ff7675' : '#2d3436' }}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="admin-td">
                    <button className="admin-edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default AdminProductPage;
