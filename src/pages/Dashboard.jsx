import { useEffect, useState } from "react";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("No user found");

        console.log("user", user);

        setCurrentUser(user);
      } catch (error) {
        logout();
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {currentUser ? <p>Welcome, {currentUser.email}</p> : <p>Loading...</p>}
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default Dashboard;
