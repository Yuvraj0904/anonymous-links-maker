import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    const getFeedback = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/feedback`, {
          withCredentials: true,
        });

        setFeedback(response.data.feedback);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    getUser();
    getFeedback();
  }, []);

  const feedbackUrl = user
    ? `${window.location.origin}/feedback/${user.feedbackLink}`
    : "";

  const handleCopy = () => {
    if (!feedbackUrl) return;
    navigator.clipboard.writeText(feedbackUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.slice(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="dashboard-shell">
      {/* Topbar */}
      <header className="dashboard-topbar">
        <div className="dashboard-brand">
          <span className="dashboard-brand-dot" />
          Candor
        </div>

        <div className="dashboard-topbar-right">
          {user && (
            <div className="dashboard-user-chip">
              <div className="dashboard-user-avatar">
                {getInitials(user.username)}
              </div>
              <span className="dashboard-user-name">{user.username}</span>
            </div>
          )}
          <button className="btn btn-danger" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="dashboard-content">
        {/* Welcome */}
        <div className="dashboard-welcome">
          <p className="dashboard-welcome-eyebrow">Your dashboard</p>
          <h1>
            {user ? (
              <>
                Hello, <span className="user-name">{user.username}</span>
              </>
            ) : (
              "Dashboard"
            )}
          </h1>
        </div>

        {/* Feedback link panel */}
        {user && (
          <div className="link-panel">
            <p className="link-panel-label">Your feedback link</p>
            <div className="link-row">
              <div className="link-display" title={feedbackUrl}>
                {feedbackUrl}
              </div>
              <button
                className={`btn-copy${copied ? " copied" : ""}`}
                onClick={handleCopy}
                aria-label="Copy feedback link"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy link
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Feedback section */}
        <div className="section-heading">
          <h3>
            Received feedback
            {feedback.length > 0 && (
              <span className="count-badge">{feedback.length}</span>
            )}
          </h3>
        </div>

        {feedback.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✦</div>
            <h3>Nothing here yet</h3>
            <p>
              Share your feedback link and people can start sending you
              honest, anonymous messages.
            </p>
          </div>
        ) : (
          <div className="feedback-list">
            {feedback.map((item, index) => (
              <div
                key={item._id}
                className="feedback-item"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <p className="feedback-item-message">{item.message}</p>
                <div className="feedback-item-meta">
                  <span className="feedback-item-anon">Anonymous</span>
                  <span className="feedback-item-time">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
