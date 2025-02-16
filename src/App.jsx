import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
