import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function Feedback() {
  const { feedbackLink } = useParams();

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        `/api/feedback/${feedbackLink}`,
        {
          message,
        },
      );

      console.log(response.data);
      setSubmitted(true);
    } catch (error) {
      console.log(error.response?.data);
      setError(error.response?.data?.message || "Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-page-inner">
        {/* Brand */}
        <div className="feedback-page-brand">
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--accent)",
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          Candor
        </div>

        {/* Header */}
        <div className="feedback-page-header">
          <p className="feedback-page-eyebrow">Anonymous message</p>
          <h1>
            Say what you <em>really</em> think.
          </h1>
          <p>
            This message is completely anonymous. The recipient will never
            know who sent it — only what was written.
          </p>
        </div>

        {/* Form or Success */}
        {submitted ? (
          <div className="feedback-success">
            <div className="feedback-success-ring">✓</div>
            <h2>Sent anonymously</h2>
            <p>
              Your message has been delivered. The recipient will see it
              in their dashboard — they will never know it was you.
            </p>
          </div>
        ) : (
          <div className="feedback-form-card">
            {error && (
              <div className="status-message error" style={{ marginBottom: "var(--space-4)" }}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <textarea
                className="feedback-textarea"
                placeholder="Write your honest message here…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
              />
              <div className="feedback-form-footer">
                <span className="feedback-form-hint">100% anonymous</span>
                <button
                  type="submit"
                  className="btn-send"
                  disabled={loading || !message.trim()}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          border: "2px solid rgba(15,14,12,0.3)",
                          borderTopColor: "var(--text-inverse)",
                          borderRadius: "50%",
                          animation: "spin 0.7s linear infinite",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Send
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;
