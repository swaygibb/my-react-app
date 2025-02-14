import axios from "axios";

const API_BASE_URL = "http://localhost:3000";
const AUTH_TOKEN = "1234567890";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${AUTH_TOKEN}`,
  },
});

export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/users/sign_in", { user: { email, password } });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await apiClient.post("/users", { user: { email, password } });
    return response.data;
  } catch (error) {
    console.error("Signup failed", error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Fetching user data failed", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};
