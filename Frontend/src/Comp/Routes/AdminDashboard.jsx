import { Link } from "react-router-dom";
import "../../App.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-wrapper">
      
      {/* Header */}
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        <p className="admin-dashboard-subtitle">
          Manage products, inventory & store operations
        </p>
      </div>

      {/* Stats */}
      <div className="admin-dashboard-stats">
        <div className="admin-dashboard-card">
          <span className="admin-dashboard-card-label">Total Products</span>
          <h2 className="admin-dashboard-card-value">120+</h2>
        </div>

        <div className="admin-dashboard-card">
          <span className="admin-dashboard-card-label">Categories</span>
          <h2 className="admin-dashboard-card-value">4</h2>
        </div>

        <div className="admin-dashboard-card admin-dashboard-warning">
          <span className="admin-dashboard-card-label">Low Stock</span>
          <h2 className="admin-dashboard-card-value">8</h2>
        </div>
      </div>

      {/* Actions */}
      <div className="admin-dashboard-actions">
        <Link to="/AdminAddProduct" className="admin-dashboard-action-card">
          <i className="fa-solid fa-boxes-stacked"></i>
          <h3>Manage Products</h3>
          <p>Edit, delete or update inventory</p>
        </Link>

        <Link to="/AdminAddProduct" className="admin-dashboard-action-card">
          <i className="fa-solid fa-plus"></i>
          <h3>Add New Product</h3>
          <p>Create fresh grocery items</p>
        </Link>
      </div>

    </div>
  );
};

export default AdminDashboard;
