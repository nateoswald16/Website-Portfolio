import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login(username, password);

    if (res.ok) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Username"
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>

        {error && <div className="text-danger mb-2" role="alert">{error}</div>}

        <button className="btn-primary w-100" aria-label="Submit login form">
          Login
        </button>
      </form>
    </div>
  );
}