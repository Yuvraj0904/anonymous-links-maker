import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";


function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
     const response = await api.post("/api/auth/register", formData);

      setMessage(response.data.message);
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-panel-left">
        <div className="auth-panel-left-brand">
          <div className="auth-brand-mark">
            <span className="auth-brand-dot" />
            <span className="auth-brand-name">Candor</span>
          </div>
        </div>

        <div className="auth-panel-left-headline">
          <h1>
            Honesty,
            <br />
            <em>without consequence.</em>
          </h1>

          <p>
            Create your account and get a private link people can use to send
            you anonymous feedback — no accounts needed on their end.
          </p>
        </div>

        <div className="auth-panel-left-footer">
          <p className="auth-left-footnote">
            "The truth is rarely pure and never simple." — Oscar Wilde
          </p>
        </div>
      </div>

      <div className="auth-panel-right">
        <div className="auth-form-container">
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
            <h2>Create account</h2>

            <p>
              Already have one?{" "}
              <Link to="/login" className="auth-form-link">
                Sign in
              </Link>
            </p>
          </div>

          {message && (
            <div
              className={`status-message ${isSuccess ? "success" : "error"}`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <div className="field">
                <label htmlFor="username">Username</label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="e.g. alex_doe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>

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
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
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
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
