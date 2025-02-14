import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Welcome to My Auth App</h2>
      <p>Select an option:</p>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
