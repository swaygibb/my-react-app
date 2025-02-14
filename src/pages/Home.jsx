import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to My React App</h2>
        <p className="text-gray-600 mb-6">Select an option:</p>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/login"
                className="block w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block w-full px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
