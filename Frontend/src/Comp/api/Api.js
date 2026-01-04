// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true, 
// });

// export default api;
import axios from "axios";

// Get token from localStorage (set this on login)
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://daily-pantry.onrender.com/api/v1",
  headers: token ? { Authorization: `Bearer ${token}` } : {},
  withCredentials: true,
});

export default api;
