import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
    const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);
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
       console.log(error.response.data);
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
        console.log(error.response.data);
      }
    };

    const getFeedback = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/feedback`, {
          withCredentials: true,
        });

        setFeedback(response.data.feedback);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getUser();
    getFeedback();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {user && (
        <div>
          <h2>Welcome, {user.username}</h2>

          <p>Email: {user.email}</p>

          <h2>Your Feedback Link</h2>

          <p>{`${window.location.origin}/feedback/${user.feedbackLink}`}</p>

          <h2>Your Feedback</h2>

          {feedback.length === 0 ? (
            <p>No feedback yet.</p>
          ) : (
            feedback.map((item) => (
              <div key={item._id}>
                <p>{item.message}</p>

                <small>{new Date(item.createdAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
