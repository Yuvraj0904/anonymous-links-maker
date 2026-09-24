import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Feedback() {
  const { feedbackLink } = useParams();

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/feedback/${feedbackLink}`,
        {
          message,
        },
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Send Anonymous Feedback</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
