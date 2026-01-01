import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../api/Api.js";

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query)}`);
        if (res.data.success) {
          setResults(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, location.search]);

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="search-results">
      <h2>Search results for: "{query}"</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              {item.type === "product" ? (
                <>
                  <strong>{item.name}</strong> - ${item.price}
                </>
              ) : (
                <Link to={item.path}>
                  <strong>{item.name} (Page)</strong>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
