import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/Login" />;
  if (role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
