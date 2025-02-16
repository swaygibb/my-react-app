import { useEffect, useState } from "react";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) throw new Error("No user found");
        setCurrentUser(user);
      } catch (error) {
        logout();
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Dashboard</h2>
        {currentUser ? (
          <p className="text-xl text-center text-gray-700">Welcome, {currentUser.email}</p>
        ) : (
          <p className="text-xl text-center text-gray-500">Loading...</p>
        )}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/reports")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            View Reports
          </button>
          <button
            onClick={() => navigate("/posts")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            View Posts
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
