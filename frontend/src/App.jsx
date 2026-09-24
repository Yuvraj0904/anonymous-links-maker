import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/feedback/:feedbackLink" element={<Feedback />} />
    </Routes>
  );
}

export default App;
