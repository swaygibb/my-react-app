import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${AUTH_TOKEN}`,
  },
});

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("/posts");

        console.log("Posts fetched:", response.data);

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Posts</h2>
        <div>
          <ul className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li
                  key={post.id}
                  className="p-4 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-600">
                    {post.body.substring(0, 100)}...
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No posts found</p>
            )}
          </ul>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
