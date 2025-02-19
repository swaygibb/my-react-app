import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/api/v1/posts/${postId}`);

        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mt-4">{post.body}</p>

        <button
          onClick={() => navigate("/posts")}
          className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to Posts
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
