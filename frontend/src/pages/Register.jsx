import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const response = await axios.post(
       `${API_URL}/api/auth/register`,
       formData,
     );

     setMessage(response.data.message);
   } catch (error) {
     setMessage(error.response.data.message);
   }
 };

  return (
    <div>
      <h1>Create Account</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
