import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/api";

export default function ProtectedRoute({ children, onAuthChange }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth()
      .then(res => res.json())
      .then(data => {
        setAuthenticated(data.authenticated);
        if (onAuthChange) {
          onAuthChange(data.authenticated);
        }
      })
      .catch(error => {
        // If checkAuth fails (401, network error, etc.), treat as not authenticated
        console.log("Auth check failed:", error);
        setAuthenticated(false);
        if (onAuthChange) {
          onAuthChange(false);
        }
      });
  }, [onAuthChange]);

  if (authenticated === null) return <p>Loading...</p>;

  return authenticated ? children : <Navigate to="/admin" />;
}