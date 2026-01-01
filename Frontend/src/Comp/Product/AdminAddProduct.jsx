import { useState, useEffect } from "react";
import api from "../api/Api.js";
import "../../App.css";
const AdminAddProduct = ({ product = null, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "Fruits",
      label: "Fresh Selection",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category || "Fruits",
        label: product.label || "Fresh Selection",

      });
      setImage(null);
    }
  }, [product]);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      if (product) {
        await api.put(`/products/update/${product._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product updated successfully");
      } else {
        await api.post("/products/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product added successfully");
      }

      setForm({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "Fruits",
      });
      setImage(null);

      onSuccess && onSuccess();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong");
    }
  };

return (
    <form onSubmit={submit} className="admin-form-card">
      <h2 className="admin-title" style={{fontSize: '1.5rem'}}>
        {product ? " Edit Product" : "Add New Product"}
      </h2>

      <div className="admin-form-grid">
        <input
          className="admin-input"
          placeholder="Product Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
<input
  className="admin-input"
  placeholder="Product Label (e.g. Organic, Imported)"
  value={form.label}
  onChange={(e) => setForm({ ...form, label: e.target.value })}
/>
        <select
          className="admin-select"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Fruits</option>
          <option>Dairy</option>
          <option>Vegetables</option>
          <option>Bakery</option>
        </select>
                <select
  className="admin-select"
  value={form.unit || "unit"} // default to "unit"
  onChange={(e) => setForm({ ...form, unit: e.target.value })}
>
  
  <option value="unit">unit</option>
  <option value="kg">kg</option>
  <option value="dozen">dozen</option>
  <option value="piece">piece</option>
  <option value="Bunch">Bunch</option>
  <option value="liter">1/liter</option>
  <option value="cup">1/cup</option>
  <option value="Pkt">Pkt</option>
  <option value="Can">Can</option>
  <option value="Box">Box</option>
</select>

        <input
          className="admin-input"
          type="number"
          placeholder="Price ($)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          className="admin-input"
          type="number"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />

        <textarea
          className="admin-textarea"
          placeholder="Product Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div style={{gridColumn: 'span 2'}}>
          <label style={{display: 'block', fontSize: '12px', color: '#636e72', marginBottom: '5px'}}>Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="admin-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="admin-submit-btn">
          {product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};
export default AdminAddProduct;
