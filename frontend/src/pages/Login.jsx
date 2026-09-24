import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
     const response = await api.post("/api/auth/login", formData);

      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      setMessage(error.response?.data?.message || "Invalid credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* Left panel */}
      <div className="auth-panel-left">
        <div className="auth-panel-left-brand">
          <div className="auth-brand-mark">
            <span className="auth-brand-dot" />
            <span className="auth-brand-name">Candor</span>
          </div>
        </div>

        <div className="auth-panel-left-headline">
          <h1>
            Welcome<br />
            <em>back.</em>
          </h1>
          <p>
            Sign in to see what people really think.
            Your anonymous feedback link is waiting.
          </p>
        </div>

        <div className="auth-panel-left-footer">
          <p className="auth-left-footnote">
            "Candor is the brightest gem of criticism." — Disraeli
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-panel-right">
        <div className="auth-form-container">
          {/* Mobile-only brand */}
          <div className="mobile-brand">
            <span
              className="auth-brand-dot"
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
              }}
            />
            Candor
          </div>

          <div className="auth-form-header">
            <h2>Sign in</h2>
            <p>
              No account yet?{" "}
              <Link to="/register" className="auth-form-link">
                Create one
              </Link>
            </p>
          </div>

          {message && (
            <div className="status-message error">{message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
